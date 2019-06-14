/****************
I declare that this assignment is my own work in accordance to the Seneca Academic Policy. 
No part of this assignment has been copied electronically or manually from any source. 
 
 Jermaine abuwa 102848173 5/31/2019
***********************/
var express = require('express');
var app = express();
var departments = require('./data/departments.json');
var employees = require('./data/employees.json');
var data = require('./data-service.js');
const multer = require("multer");
const path = require("path");
app.use(express.static('public'));
const HTTP_PORT = process.env.PORT || 8080;
var fs = require('fs');
let bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));



 app.get('/', function (req, res) {
	 res.sendFile(__dirname+ '/views/home.html');
	 
	 
 });
 const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });
 
 app.get('/employees/add', function (req, res) {
	 res.sendFile(__dirname+ '/views/addEmployee.html');
 });
  app.get('/images/add', function (req, res) {
	 res.sendFile(__dirname+ '/views/addImage.html'); 
 });
  app.post('/images/add',upload.single('imageFile'), function (req, res) {
	 res.redirect('/images'); 
 });
 app.get('/images', function (req, res) {
	 
	 fs.readdir('./public/images/', function(err, items) {
     res.json({images:items});
});
	  });
 
 
 
 
  app.get('/home', function (req, res) {
	 res.sendFile(__dirname+ '/views/home.html');
	 
	 
 });
 
 
 app.get('/about', function (req, res) {
	 
	 res.sendFile(__dirname+ '/views/about.html');
	 
	 
 });

  app.get('/employees/:value', function (req, res) {
	       data.num(req.params.value).then(function(succ){
		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
      	 
	 
 });

 

 
   app.get('/employees', function (req, res) {
	  
	
	  if(req.query.manager != 'undefined'){
		  data.Managers(req.query.manager).then(function(succ){
		 // use req.query.status value
		 
		 		console.log(req.query.manager)

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		 		 		console.log(req.query.manager)

		  res.json({
          data:'fail'
	   })
		 
		 
	 });
		  
	  } else if (req.query.status != 'undefined'){ 
	  data.stat(req.query.status).then(function(succ){
		 // use req.query.status value
		 

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
	  } else if (req.query.department != 'undefined'){
		  data.depart(req.query.department).then(function(succ){
		 // use req.query.status value
		 

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
		  
	  } else  {
	  
	 data.emp().then(function(succ){
		 // use req.query.status value
		 

		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
	  }
	 
 });
 
 app.post('/employees/add', function (req, res) {
	 console.log(req.body);
	 data.addPeople(req.body).then(function(succ){
		  console.log(suc)
		 
		 
		 
	 }).catch(function(fail){
		 console.log(fail);
		 
		 
	 });
		
	 
 });
 
 
  app.get('/managers', function (req, res) {
          data.manage().then(function(succ){
		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
 });
  app.get('/departments', function (req, res) {
	 	 data.dep().then(function(succ){
		  res.json({
          data:succ
	   })
		 
		 
		 
	 }).catch(function(fail){
		  res.json({
          data:'fail'
	   })
		 
		 
	 });
		
    
	 
 });
 
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
 
 
 

 
 
 

 
 
 app.listen(HTTP_PORT, function () {
   data.init().then(function(succ){
		console.log('server on!');
		 
		 
		 
	 }).catch(function(fail){
		 console.log('didnt load data');
		 
	 });
  
});

	 
