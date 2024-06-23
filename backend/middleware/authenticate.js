const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel'); // Ajusta la ruta según tu modelo de usuario
require('dotenv').config();

function soloAdmin(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado) return next();
  return res.redirect("/patagonia");
}

function soloPublico(req, res, next) {
  const logueado = revisarCookie(req);
  if (!logueado) return next();
  return res.redirect("/index");
}

function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada);
    const usuarioAResvisar = UserModel.find(UserModel => UserModel.email === decodificada.email);
    console.log(usuarioAResvisar);
    if (!usuarioAResvisar) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

module.exports = { soloAdmin, soloPublico };
