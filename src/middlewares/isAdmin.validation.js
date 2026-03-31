
const isAdmin = (req, res, next) => {

    if(!req.user.isAdmin) {
        return res.status(403).json({ message: "Acceso denegado, debe ser administrador" });
    }
    next();
}

module.exports = isAdmin;