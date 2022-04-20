module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Enadinho123',
    DB: 'gray_fox_db',
    dialect: 'mysql',

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000
    }
}