const mongoose = require('mongoose')

const dbmongo = 'mongodb://localhost:27017/Unitutor'

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            dbmongo,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUndefiendTopology: true
            },
            (err) => {

            }
        )
    }
}