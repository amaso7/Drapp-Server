const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const port = process.env.PORT || 5000
const app = express()
const SELECT_ALL_Pt_QUERY = 'SELECT * FROM pt'
//db connection
const connection = mysql.createConnection({
    host: "localhost",
    database: "mydb",
    user: "saadh",
    password: "A11db2231*$"
    
})

connection.connect(err =>{
    if(err){
        return err
    }
})


app.use(cors())
// ('/') home
app.get('/', (req, res)=> {
    res.send('Server is running...')
})


//instead of using post method 
app.get('/api/pts/add', (req, res) => {
    const {firstname, lastname, dob, provider, prevappt, nextappt, meds, num, msg} = req.query
    const INSERT_Pt_QUERY = `INSERT INTO pt (firstname, lastname, dob, provider, prevappt, nextappt, meds, num, msg) VALUES('${firstname}', '${lastname}', '${dob}', '${provider}', '${prevappt}', '${nextappt}', '${meds}', '${num}', '${msg}')`
    connection.query(INSERT_Pt_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else{
            return res.send('Message sent!')
        }
    })
})   // creates api from db as JSON
app.get ('/api/pts', (req, res) => {
    connection.query(SELECT_ALL_Pt_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        }
        else {
            return res.json({
                data:results
            })
        }
    })
}) // local host:5000 -> predeploy will use Heroku
app.listen(port, () =>{
    console.log('Server is running ...')
})