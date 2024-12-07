const app = require('./app')
/* const https = require('https')
const fs = require('fs')
const server = https.createServer(app) */

/* const option = {
    key:fs.readFileSync('./agent2-key.pem'),
    cert:fs.readFileSync('./agent2-cert.pem')
} */

app.listen(app.get('port'),() => {
    console.log(`https://localhost:${app.get('port')}`)
})


