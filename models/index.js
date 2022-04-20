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

db.sequelize.sync({force: true})
.then(()=>{
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

module.exports = db
