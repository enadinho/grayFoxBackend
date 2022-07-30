module.exports = (sequelize, DataTypes) => {
    const Cast = sequelize.define('cast', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
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
        weight: {
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
        bodytype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        workshops: {
            type: DataTypes.STRING,
            allowNull: false
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.ENUM("pending", "rejected", "accepted"),
            allowNull: false,
            defaultValue: "pending"
        },
        isActive:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    
    return Cast
}