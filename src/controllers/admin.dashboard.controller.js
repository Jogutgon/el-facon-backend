const User = require('../models/user.model')
const Reservation = require('../models/reservation.model')

const adminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments( { isAdmin: false});
        const totalReservations = await Reservation.countDocuments();
        const inactiveUsers = await User.countDocuments({ status: false });

        return res.status(200).json({
            totalUsers,
            totalReservations,
            inactiveUsers
            }
        )

    } catch (error) {
        res.status(500).json({
            message: "ERROR AL BUSCAR LAS ESTADISTICAS"
        })
    }
}

module.exports = adminDashboard
