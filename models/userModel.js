module.exports = (sequelize, DataTypes) => {
    const Cast = sequelize.define('cast', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        national: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        talent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        width: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo_session: {
            type: DataTypes.STRING,
            allowNull: false
        },
        field_19: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
        
    })

    return Cast
}