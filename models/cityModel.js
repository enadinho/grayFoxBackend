module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('city', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return City;
}