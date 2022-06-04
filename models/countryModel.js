module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('country', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return Country;
}