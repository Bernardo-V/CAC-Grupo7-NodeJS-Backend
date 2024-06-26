const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel'); // Ajusta la ruta según tu modelo de usuario
require('dotenv').config();

function soloAdmin(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado) return next();
  return res.redirect("/miperfil");
}

function soloPublico(req, res, next) {
  const logueado = revisarCookie(req);
  if (!logueado) return next();
  return res.redirect("/index");
}

async function revisarCookie(req) {
  try {
     const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET);
    const usuarioAResvisar = await UserModel.findOne({ where: { id: decodificada.id } });
    
    console.log(usuarioAResvisar);
    if (!usuarioAResvisar) {
      return false;
    }
    req.user = usuarioAResvisar; // Añade el usuario a la solicitud
    next();
    return true;
  } catch {
    return false;
  }
}

module.exports = { revisarCookie, soloAdmin };
