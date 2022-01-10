const dotenv = require('dotenv')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const port = process.env.PORT || 5000
const app = express()
const SELECT_ALL_Pt_QUERY = 'SELECT * FROM heroku_da43e4b976c21c8.pts'

app.use(cors())
//db connection
try {const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

connection.connect(err =>{
    if(err){
        return err
    }
})
}
catch(err) {
  console.log(err)
} 

// ('/') home
app.get('/', (req, res)=> {
    res.send('Server is running...')
})


//instead of using post method 
app.get('/pts/add', (req, res) => {
    const {firstname, lastname, dob, provider, prevappt, nextappt, meds, num, msg} = req.query
    const INSERT_Pt_QUERY = `INSERT INTO heroku_da43e4b976c21c8.pts (firstname, lastname, dob, provider, prevappt, nextappt, meds, num, msg) VALUES('${firstname}', '${lastname}', '${dob}', '${provider}', '${prevappt}', '${nextappt}', '${meds}', '${num}', '${msg}')`
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
}) // condition for production
if (process.env.NODE_ENV === "production"){
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,  "build", "index.html"));
    });
  }
// local host:5000 -> predeploy use Heroku https://powerful-stream-34454.herokuapp.com
app.listen(port, () =>{
    console.log('Server is running ...')
})