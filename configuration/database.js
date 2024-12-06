const {connect} = require('mongoose')

const database = connect(process.env.URL,{
    maxStalenessSeconds:5000
}).catch(e => console.log('Error database connect ',e)).finally(() =>{console.info('Connection exitosa')})

module.exports = database

