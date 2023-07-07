const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors');

const app = express()
dotenv.config()

let whitelist = ['http://localhost:8080']
let corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
        extended: true
    })
)

const db = require('./models/index')
db.sequelize
.sync()
.then(() => {
    console.log('database connected');
}).catch((err) => {
    console.log('database connected failed');
});

app.get('/', (req, res) => {
    res.json({
        massage: 'server is running'
    })
})

require('./routes/auth.route')(app)
require('./routes/profile.route')(app)

const PORT = 4000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})