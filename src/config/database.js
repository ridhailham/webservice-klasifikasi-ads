const Sequelize = require('sequelize')

const config = {
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT, 
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 100, 
        min: 0,
        acquire: 30000, 
        idle: 10000,
    },
}

const db = new Sequelize(
    config.database, 
    config.username, 
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: 'mysql',
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)


module.exports = db