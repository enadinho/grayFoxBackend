const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const app = express()


var corOptions = {
    origin: 'http://localhost:4200'
}


//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// routers
const castRouter = require('./routes/userRouter')
const employeeRouter = require('./routes/employeeRouter')
const countryRouter = require('./routes/countryRouter')
app.use('/api/cast', castRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/country', countryRouter)


app.get('/', (req, res) =>{
    res.json({message: 'hi zag'})
})

//port
const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log('server is running in port ' + PORT)
})
