const express = require('express');
const router = express.Router();
require('dotenv').config()
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'project_guestbook'
});

// const {promisify} = require ('util');
// var Promise = require('promise');
// const getFilePromise = promisify(connection.query())
const q = require('q')

//get all comments with promise
function getComments(query) {
  var deferred = q.defer();

  connection.query(query, function(err, res){
    if(err) throw err
    deferred.resolve(res)
  })

  return deferred.promise
}

//get comment for certain id with promise
function getComment(query, id){
  var deferred = q.defer();

  connection.query(query, id, function(err, res){
    if(err) throw err
    deferred.resolve(res)
  })

  return deferred.promise
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign in to Google', google_client_id: process.env.GOOGLE_CLIENT_ID });
});

// //mysql fetch promises in action 
router.get('/get-all-guest-comments', function(req, res, next){
  getComment('SELECT * FROM guest_comments where id = ?', '1').then(function (result) {
    getComments('SELECT * FROM guest_comments').then(function (result2){
      res.send({
        result1: result,
        result2: result2
      })
    })
  })
})

module.exports = router;
