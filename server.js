const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const app = express()
const cookieSession = require('cookie-session');

var corOptions = {
    origin: ['http://localhost:4200',
             'http://localhost:4201'],
    optionsSuccessStatus: 200,
    credentials: true
}


//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cookieSession({
      name: "grayfox-session",
      secret: "COOKIE_SECRET", // should use as secret environment variable
      httpOnly: true,
      sameSite: 'strict'
    })
);

// routers
const castRouter = require('./routes/userRouter')
const employeeRouter = require('./routes/employeeRouter')
const countryRouter = require('./routes/countryRouter');

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
