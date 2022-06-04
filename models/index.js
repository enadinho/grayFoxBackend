const dbConfig = require('../config/dbConfig.js')

const {Sequelize, DataTypes} =require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idel: dbConfig.pool.idel
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected...')
})
.catch(err => {
    console.log('ERROR: '+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./userModel.js')(sequelize, DataTypes)
db.employee = require('./employeeModel.js')(sequelize, DataTypes)
db.country = require('./countryModel.js')(sequelize, DataTypes)
db.city = require('./cityModel.js')(sequelize, DataTypes)


const masterdata = async () => {
    db.country.create({
        name: 'Saudi Arabia', code: 'SA', status: 1,
    });

    db.city.create({
            name: "Riyadh", status: 1, country_id: 1
    });

};

db.sequelize.sync() // force true will drop existing table data
.then(()=>{
    // masterdata();
    console.log('yes re sync DONE !')
})

//relation
db.employee.hasMany(db.user,{
    foreignKey: 'employee_id',
    as: 'cast'
})

db.user.belongsTo(db.employee, {
    foreignKey: 'employee_id',
    as: 'employee'
})

db.city.belongsTo(db.country, {
    foreignKey: 'country_id',
    as: 'country'
})

db.country.hasMany(db.city, {
    foreignKey: 'country_id',
    as: 'city'
})

module.exports = db
