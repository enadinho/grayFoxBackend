const dbConfig = require('../config/dbConfig.js')

const {Sequelize, DataTypes} =require('sequelize')
const bcryptjs = require('bcryptjs')
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


const testdata = async () => {
    
    encryptedPassword = await bcryptjs.hash("test@123", 10);

    db.employee.create({
        first_name: "Test", last_name: "User", email: "testuser@gmail.com", password: encryptedPassword, active: true
    })
    db.employee.create({
        first_name: "Test1", last_name: "User1", email: "testuser1@gmail.com", password: encryptedPassword, active: false
    })
    db.employee.create({
        first_name: "Test2", last_name: "User2", email: "testuser2@gmail.com", password: encryptedPassword, active: true
    })

    let cast ={ firstname: "Anita", lastname: "Gabbission", national: "sa", mobile: "0534334533", bodytype: "Fit", city: "Riyadh",
        talent: "Talent", height: "180CM", weight: "75KG", workshops: "", gender: "F", image: "1",
        experience: "There was a small one behind our house and it provided endless fun for me and my brothers and sisters.", 
        birthday: "12/12/1990", email: "",status: "pending", isActive: true
    }

    db.user.create(cast);
    cast.firstname="Cast Name1";
    cast.lastname="Last Name1";
    cast.national="in";
    cast.bodytype="Athletic";
    cast.height="170CM"
    cast.image="middleware/resources/static/img/profiles/1.jpg"
    db.user.create(cast);
    cast.firstname="Cast Name2";
    cast.lastname="Last Name2";
    cast.national="lk";
    cast.image="middleware/resources/static/img/profiles/2.jpg"
    db.user.create(cast);
    cast.firstname="Cast Name3";
    cast.lastname="Last Name3";
    cast.national="in";
    cast.gender="M"
    cast.image="middleware/resources/static/img/profiles/3.jpg"
    db.user.create(cast);
    cast.firstname="Cast Name4";
    cast.lastname="Last Name4";
    cast.national="sa";
    cast.gender="F"
    cast.image="middleware/resources/static/img/profiles/4.jpg"
    db.user.create(cast);
    cast.status="accepted";
    db.user.create(cast);
    cast.status="rejected";
    db.user.create(cast);
    // db.country.create({
    //     name: 'Saudi Arabia', iso2: 'SA', iso3: 'KSA', isActive: 1,
    // });

    db.country.bulkCreate([
        { name: 'Saudi Arabia', iso2: 'SA', iso3: 'KSA', isActive: 1 },
        { name: 'United Arab Emirates', iso2: 'AE', iso3: 'UAE', isActive: 1 },
      ]).then(() => console.log("Countries have been saved"));
     
    db.city.bulkCreate([
    {  name: "Riyadh", status: 1, country_id: 1 },
    {  name: "Jeddah", status: 1, country_id: 1 },
    {  name: "Qassim", status: 1, country_id: 1 },
    {  name: "Mekkah", status: 1, country_id: 1 },
    ]).then(() => console.log("Countries have been saved"));  
    // db.city.create({
    //         name: "Riyadh", status: 1, country_id: 1
    // });

};

db.sequelize.sync( {force: true}) // force true will drop existing table data
.then(()=>{
    testdata();
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
