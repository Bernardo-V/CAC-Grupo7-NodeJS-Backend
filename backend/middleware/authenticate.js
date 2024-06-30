const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel'); // Ajusta la ruta según tu modelo de usuario
require('dotenv').config();

async function soloAdmin(req, res, next) {
  try {
    console.log('admin')
    const logueado = await revisarCookie(req); // Esperar a que revisarCookie resuelva su promesa
    console.log('logueado:', logueado);
    
    if (logueado) {
      return next();
    }
    else {
      return res.redirect("/sesion");
    }
  } catch (error) {
    console.error('Error en revisarCookie:', error);
    return res.redirect("/sesion"); // Manejar errores redirigiendo a /miperfil
  }
}


async function revisarCookie(req) {
  try {
     const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET);
    const usuarioAResvisar = await UserModel.findOne({ where: { idusuarios: decodificada.id } });
    console.log('usu a revisar')
    console.log(usuarioAResvisar);
    if (!usuarioAResvisar) {
      return false;
    }
    req.user = usuarioAResvisar;
    // Añade el usuario a la solicitud
    return true;
  } catch (error) {
    console.error('Error en revisarCookie:', error);
    return false;
  }
}

// function soloPublico(req, res, next) {
//   const logueado = revisarCookie(req);
//   if (!logueado) return next();
//   return res.redirect("/index");
// }
module.exports = { revisarCookie, soloAdmin };
