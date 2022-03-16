/*please keep in mind while reviewing my code that my code is the result of practicing each lesson in the classroom 
and i write the code in the same order as explained in the Development Strategy lesson in the class room
so my code might be similair to what i studied in the classroom */



// Create a new date instance dynamically with JS
let d = new Date();
//getMonth() count from 0 to 11 as 0 is january = 1
//so i created new variable will add 1 to the current number to provide the right number of the month
//also there is other way i can do it 
/* var getMonth = d.getMonth();    // the month
        var monthName;                     //convert month number to the correct name
        if (getMonth===0){monthName="January";}
        else if (getMonth===1){monthName="February";}
        else if (getMonth===2){monthName="March";}
        else if (getMonth===3){monthName="April";}
        else if (getMonth===4){monthName="May";}
        else if (getMonth===5){monthName="Jun";}
        else if (getMonth===6){monthName="July";}
        else if (getMonth===7){monthName="August";}
        else if (getMonth===8){monthName="September";}
        else if (getMonth===9){monthName="October";}
        else if (getMonth===10){monthName="November";}
        else if (getMonth===11){monthName="December";}
let newDate = monthName+'.'+ d.getDate()+'.'+ d.getFullYear();*/  
/*then if i want to use this i  will add date:newDate to the postData to add the month name 
instead of date2:newDate2 which add the month number*/


//but i will use this to show the date because it's less lines of code
let month = d.getMonth() + 1
let newDate2 = month+'.'+ d.getDate()+'.'+ d.getFullYear();
// The Global Variables 
//URL 
const url = "http://api.openweathermap.org/data/2.5/weather?zip=";
// My API Key for OpenWeatherMap 
const apiKey = '&appid=7e852ce9189abb5ab2ffc2bfd40cec27&units=imperial';   // i used &units=imperial to return the Fahrenheit instead of Kelvin


// Event listener on click the button
//practicing lesson 4 part 6
document.getElementById('generate').addEventListener('click', generateData);
function generateData(e){  
  const userValue = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;
  retrieveData(url, userValue, apiKey)
  .then(data =>{
    console.log(data);
    postData('/addData', {country:data.sys.country, name :data.name, temp:data.main.temp, userFeelings, date2:newDate2});

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
   // document.getElementById("temp").innerHTML = `Temp: ${allData.temp}`;
    document.getElementById("temp").innerHTML = Math.round(allData.temp)+ ' °F degrees';

    document.getElementById("content").innerHTML = allData.content;
    //document.getElementById("date").innerHTML = `Today date with month name: ${allData.date}`; // use this line if i want the month name
    document.getElementById("date").innerHTML = `Today date: ${allData.date2}`;  // use this line if i want the month number

  }catch(error){
    console.log("error", error);
  }
}

