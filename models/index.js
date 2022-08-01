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

    adminPassword = await bcryptjs.hash("admin@123", 10);


    db.employee.create({
        first_name: "Test", last_name: "User", email: "testuser@gmail.com", password: encryptedPassword, active: true
    })
    db.employee.create({
        first_name: "Admin", last_name: "User", email: "adminuser@gmail.com", password: adminPassword, active: false
    })
    db.employee.create({
        first_name: "Test2", last_name: "User2", email: "testuser2@gmail.com", password: encryptedPassword, active: true
    })

    let cast ={ firstname: "Anita", lastname: "Gabbission", national: "Saudi Arabia", countrycode: "Saudi Arabia", mobile: "0534334533", bodytype: "Fit", city: "Riyadh",
        talent: "Talent", height: "180CM", weight: "75KG", workshops: "", gender: "F", image: "1",
        experience: "There was a small one behind our house and it provided endless fun for me and my brothers and sisters.", 
        birthday: "12/12/1990", email: "",status: "pending", isActive: true
    }
    cast.image="middleware/resources/static/img/profiles/1.jpg"
    cast.countrycode="sa"
    db.user.create(cast);
    cast.firstname="Cast Name1";
    cast.lastname="Last Name1";
    cast.national="India";
    cast.countrycode="in"
    cast.bodytype="Athletic";
    cast.height="170CM"
    cast.image="middleware/resources/static/img/profiles/2.jpg"
    db.user.create(cast);
    cast.firstname="Cast Name2";
    cast.lastname="Last Name2";
    cast.national="Sri Lanka";
    cast.countrycode="lk"
    cast.image="middleware/resources/static/img/profiles/3.jpg"
    db.user.create(cast);
    cast.firstname="Cast Name3";
    cast.lastname="Last Name3";
    cast.national="India";
    cast.countrycode="in"
    cast.gender="M"
    cast.image="middleware/resources/static/img/profiles/4.jpg"
    db.user.create(cast);
    cast.firstname="Cast Name4";
    cast.lastname="Last Name4";
    cast.national="Saudi Arabia";
    cast.countrycode="sa"
    cast.gender="F"
    cast.image="middleware/resources/static/img/profiles/5.jpg"
    db.user.create(cast);
    cast.image="middleware/resources/static/img/profiles/6.jpg"
    cast.status="accepted";
    db.user.create(cast);
    cast.image="middleware/resources/static/img/profiles/7.jpg"
    cast.status="rejected";
    db.user.create(cast);
    // db.country.create({
    //     name: 'Saudi Arabia', iso2: 'SA', iso3: 'KSA', isActive: 1,
    // });

    db.country.bulkCreate([
        { name: 'Saudi Arabia', iso2: 'sa', iso3: 'ksa', isActive: 1 },
        { name: 'United Arab Emirates', iso2: 'ae', iso3: 'uae', isActive: 1 },
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
