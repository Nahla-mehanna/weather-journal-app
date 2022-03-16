/*please keep in mind while reviewing my code that my code is the result of practicing each lesson in the classroom
and i write the code in the same order as explained in the Development Strategy lesson in the class room
so my code might be similair to what i studied in the classroom */


// Empty JS object to act as endpoint for all routes
let projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 3000;
// Spin up the server
//listining function practicing lesson 2 part 6
const server = app.listen(port, listening);
 function listening(){
    console.log(`Hi Nahla the server is running on localhost: ${port}`);
  };



// using get to return ProjectData object
//practicing lesson 3 part 3
app.get('/all', returnProjectData);

function returnProjectData (request, response) {
  response.send(projectData);
}

//Post Data to the project data object
//practicing lesson 3 part 9
app.post("/addData", addData);

function addData (req, res){
  const theData = {
    country : req.body.country,
    name : req.body.name,
    temp : req.body.temp,
    content : req.body.userFeelings,
    //date : req.body.date,  // i will use this line of code if i want the date with month name to appear instead of the month number
    date2 : req.body.date2,  // this shows the date with the month number
  }
  projectData =  theData;
  res.send(projectData);
};