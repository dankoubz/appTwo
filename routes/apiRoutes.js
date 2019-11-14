// Requiring our models
var path = require("path");
var db = require("../models");
const bcrypt = require('bcrypt')


// Routes
// =============================================================
module.exports = function(app) {


  app.post("/api/create", async function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property

    try {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            db.users.create({
              username: req.body.username,
              password: hash
            }).then(function(dbuser) {
              // We have access to the new todo as an argument inside of the callback function
              res.json(dbuser);
            }).catch(function(err) {
              return res.redirect('/');
            });
        });
    });
      
    } catch (error) {
      res.status(500).send();
    }

  });

  app.post("/api/login", async function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    const passwd = req.body.password;
    db.users.findOne({
      where: {username:req.body.username},
      attributes: ['id', ['password', 'data']]
    }).then(function(dbuser){
      bcrypt.compare(passwd,dbuser.get('data'),function(err,result){
        if(err)throw err;
        return res.json(result);
        })
    })

  });

  app.post("/api/addscore", async function(req, res) {
    console.log(db.users)
    db.users.findOne({ where: { username: req.body.username } })
    .then(function (user) {
      // Check if record exists in db
      if (user) {
        user.update({
          total_score: req.body.total_score
        })
        .then(function (result) {
          res.json(result)
        })
      }
    })
  });

  app.get("/api/leaderboard", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.users.findAll(
      {limit:10, order: [['total_score', 'DESC']]}).then(function(result) {
      // We have access to the todos as an argument inside of the callback function
      return res.json(result);
      
    });

  });

  



};



