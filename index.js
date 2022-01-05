const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 5000
const app = express()
const SELECT_ALL_Pt_QUERY = 'SELECT * FROM pt'
//db connection

var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    database: "mydb",
    user: "saadh",
    password: "A11db2231*$"
  });
  
  pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
  });
connection.connect(err =>{
    if(err){
        return err
    }
})

connection.end(function(err) {
    // The connection is terminated now
  });

app.use(cors())
// ('/') home
app.get('/', (req, res)=> {
    res.send('Server is running...')
})


//instead of using post method 
app.get('/pts/add', (req, res) => {
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