var HeadDay = document.getElementById("hDay");
var HeadDate = document.getElementById("hDate");
var HeadLocat = document.getElementById("hLocat");
var HeadTemp = document.getElementById("hTemp");
var HeadWeather = document.getElementById("hWeather");
var search = document.getElementById("search");

search.addEventListener("change",function(e){
   console.log(search.value);
   getData(search.value);
})
getData("cairo");

var allData =[];

function getData(key){
    var myRequest = new XMLHttpRequest();
    myRequest.open("GET",`https://api.weatherapi.com/v1/forecast.json?key=fe0919367ee04d42aa9181628233012&q=${key}&days=3`);
    myRequest.send()
    myRequest.addEventListener("readystatechange", function(){
    if(myRequest.readyState ===4){
         allData = JSON.parse(myRequest.response);
        display();
        displayTime();
        displayDay();
    }
})
}
function display(){
    // ~ HeadDay
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var date = new Date();
      let month = months[date.getMonth()];
      HeadDay.innerHTML = month;
      console.log(month);
    // ~ Data
      console.log(allData);
    // ~ Time
    var time = allData.location.localtime;
    console.log(time);
    HeadDate.innerHTML = time;
    // ~ location 
      var location = `${allData.location.name}, ${allData.location.country}`;
      console.log(location);
      HeadLocat.innerHTML = location;
    // ~ Temp
      var temp = `${allData.current.temp_c}°C`;
      console.log(temp);
      HeadTemp.innerHTML = temp;
    // ~ Caption
      var cond = `${allData.current.condition.text}`;
      console.log(cond);
      HeadWeather.innerHTML = cond;
    console.log("end one side");
}
function displayTime(){
    // ! 3 days
    var hours = allData.forecast;
    console.log(hours);
    // ! Times in the day
    var cart = document.getElementById('cart');
    cartonaa =`<li class="liActiveTemp ms-1">
    <p class="mt-2">${hours.forecastday[0].hour[0].condition.text}</p>
    <i class="fa-solid fa-cloud "></i>
    <span id="bDat2">00:00</span>
    <span class="temperature" id="bTemp2">${hours.forecastday[0].hour[0].temp_c}</span>
    </li>`;
    for(var i=0; i< 22; i= i+2){
        if(i<=6){
            //  console.log(i+2)
            cartonaa +=`<li class="liActiveTemp ms-1 ">
            <p class="mt-2">${hours.forecastday[0].hour[0].condition.text}</p>
            <i class="fa-solid fa-cloud "></i>
            <span id="bDat2">0${i+2}:00</span>
            <span class="temperature" id="bTemp2">${hours.forecastday[0].hour[i+2].temp_c}</span>
            </li>`
        }else if(i>=8){
            //  console.log(i+2)
            cartonaa +=`<li class="liActiveTemp ms-1">
           <p class="mt-2">${hours.forecastday[0].hour[0].condition.text}</p>
           <i class="fa-solid fa-cloud "></i>
           <span>${i+2}:00</span>
           <span class="temperature">${hours.forecastday[0].hour[i+2].temp_c}</span>
           </li>`
        }
    }
    cart.innerHTML = cartonaa;
    console.log("end two side");
}
function displayDay(){
  // & different day
    var DayRow = document.getElementById("DayRow");
    var carton =``;
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var days2 = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var date = new Date();
    for(var i=0; i<3; i++){
      // ? name day
        let day = days[date.getDay()+i];
        console.log(day);
      // ? date
        var allDay = allData.forecast.forecastday[i].date;
        console.log(allDay);
        let dayy = date.getDay()+i;
        console.log(dayy);
      // ? caption 
        var allDay3 = allData.forecast.forecastday[i].day.condition.text;
        console.log(allDay3);
      // ? display
        carton += `<div class="col-md-4 gl-lg-5 AAA">
        <div class="caption w-100">
          <div class="layer3 cont">
            <div>
              <h2 >${days[date.getDay()+i]}</h2> 
              <p class="one">${allDay}</p> 
              <p class="two">${allData.forecast.forecastday[i].day.avgtemp_c}°C</p> 
              <h3 class="h3_left" >"${allDay3}"</h3>
            </div>
          </div>
        </div>
      </div>`
    }
    DayRow.innerHTML = carton;
    console.log("end three side");
}