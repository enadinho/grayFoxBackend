module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        token: { type: DataTypes.STRING },
    })

    return Employee
}