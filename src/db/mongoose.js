const mongoose = require('mongoose')
const connectionURL = 'mongodb://127.0.0.1:27017/recipe-api'

mongoose.connect(connectionURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false
})
