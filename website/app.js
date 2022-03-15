/*please keep in mind while reviewing my code that my code is the result of practicing each lesson in the classroom 
and i write the code in the same order as explained in the Development Strategy lesson in the class room
so my code might be similair to what i studied in the classroom */



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// The Global Variables 
//URL 
const url = "http://api.openweathermap.org/data/2.5/weather?zip=";
// My API Key for OpenWeatherMap 
const apiKey = '&appid=7e852ce9189abb5ab2ffc2bfd40cec27';


// Event listener on click the button
//practicing lesson 4 part 6
document.getElementById('generate').addEventListener('click', generateData);
function generateData(e){  
  const userValue = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;
  retrieveData(url, userValue, apiKey)
  .then(data =>{
    console.log(data);
    postData('/addData', {country:data.sys.country, name :data.name, temp:data.main.temp, userFeelings, date:newDate});

  })
  //updating UI elements
  .then(() => updateUI())
};




// the fetch function to get data 
const retrieveData = async (url, userValue, apiKey) =>{
  const request = await fetch(url+userValue+apiKey);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
    return allData;
  }catch(error) {
    console.log("error", error);
  }
}

// Async POST
//practicing lesson 4 part 2
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url,{
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
  //make it jason
    body: JSON.stringify(data)
          
});

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("error", error);
    }
}

//lesson 4 part 10 parcticeing updating ui element
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById("country").innerHTML = `Country Name: ${allData.country}`;
    document.getElementById("name").innerHTML = `City Name: ${allData.name}`;
    document.getElementById("temp").innerHTML = `Temp: ${allData.temp}`;
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("date").innerHTML = `Today date: ${allData.date}`;
  }catch(error){
    console.log("error", error);
  }
}

