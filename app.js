const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : 'password',
    database    : 'join_us'
});

app.get("/", function(req, res) {
    // Find count of users in DB
    let q = "SELECT COUNT(*) AS count FROM users;"
    connection.query(q, function(err, results) {
        if(err) throw err;
        let count = results[0].count;

        // Respond with that count
        // res.send(`We have ${count} subscribers in our database`);   

        // Send count variable to home.ejs
        res.render("home", {data: count});
    });
});

app.post("/register", function(req, res) {
    let person = {
        email: req.body.email,
        first_name: req.body.first_name
    }

    connection.query('INSERT INTO users SET ?', person, function(err, results) {
        if(err) throw err;
        res.redirect("/");
    });
});

app.get("/joke", function(req, res) {
    let joke = "What do you call a blah blah blah? A dityo bitmoo";
    res.send(joke);
});

app.get("/random", function(req, res) {
    let num = Math.floor(Math.random() * 10) + 1;
    res.send(`Your random number is ${num} !!`);
});

app.listen(8080, function() {
    console.log("Server running");
});