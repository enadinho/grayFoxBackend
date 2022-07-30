
module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define('country', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iso2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iso3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return Country;
}