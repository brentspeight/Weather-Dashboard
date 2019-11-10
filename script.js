$(document).ready(function () {
    var search = $('#searchInput');
    var button = $('#btnSearch');
    var weather = $('#weatherInfo');
    var city = search.val()
    //var APIKey = '&appid=b6907d289e10d714a6e88b30761fae22';

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + 'london' + '&&appid=eace98b75721afa73cf7beb78d36ae62';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        var imgThree = src = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var newCard = `<div id="weather" class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" style="font-size:50px; margin-bottom:20px; color:red">${response.name}</h5>
            <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png" >
            <h6 class="card-subtitle mb-2 text-muted">Temperature: ${response.main.temp}</h6>
            <p class="card-text">Humidity: ${response.main.humidity}</p>
            <p class="card-text">Wind Speed: ${response.wind.speed}</p>
            <p class="card-text btn btn-danger btn-sm"" style ='background-color:red; border-radius: 25px'>UV Index: ${response.coord.lat + response.coord.lon}</p>
        </div>
        </div>`

        weather.append(newCard)
    })
    var queryURLFour = 'https://openweathermap.org/data/2.5/forecast?q=' + 'London' + 'us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22';
    $.ajax({
        url: queryURLFour,
        method: "GET"
    }).then(function (forecastRes) {
        console.log(forecastRes);
        console.log(queryURLFour);
        for (var i = 0; i < forecastRes.list.length; i++) {
            // var a ="abc"    indexof("d") === -1   indexof("bc") === 1
            // indexOF is givin you the index where the info is starting (string / array )  
            // when is not founding anything then return always -1
            // or a postive result   or -1
            if (forecastRes.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                console.log(forecastRes.list[i].dt_txt.indexOf("15:00:00"))
                var day = forecastRes.list[i].dt_txt.split(" ")  // "24-03-2019 15:00:00"  === index = 11
                console.log("day: ", forecastRes.list[i].dt_txt, day)
                var forecastName = $('<div class="col"><p>' + day[0] + '</p>')
                // add icon logos based on their weather conditions
                var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecastRes.list[i].weather[0].icon + ".png");
                var tempFive = $('<div id = "tempFive">' + 'Temperature: ' + forecastRes.list[i].main.temp + '<div>');
                var humFive = $('<div id = "humFive"> ' + 'Humidity: ' + forecastRes.list[i].main.humidity + '<div>');
                forecastName.append(img);
                forecastName.append(tempFive);
                forecastName.append(humFive);
                $('#fiveDay').append(forecastName);
            }
        }
    })
    console.log(city);
    //create a function for whenever the user clicks search 

    button.click(function (event) {
        event.preventDefault();
        var city = search.val()
        var ul = $('ul')
        var searchList = $('#searchList');
        var cityForm = $('#cityForm');
        console.log($(this).text())
    
        listMaker()
        clear();
        function listMaker() {
            var li = $('<li>');
            li.text(city);
            ul.append(li);
        }
        console.log("city:", city)
        var queryURLTwo = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&&appid=eace98b75721afa73cf7beb78d36ae62';
        console.log(queryURLTwo)
        //using the server side api the results of the current weatherappended on the page
        $.ajax({
            url: queryURLTwo,
            method: "GET"
        }).then(function (responseR) {
            console.log(responseR);
            var imgTwo = src = "https://openweathermap.org/img/w/" + responseR.weather[0].icon + ".png";
            console.log(responseR.weather[0].icon);
            var newCard = `<div id="weather" class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title" style="font-size:40px; margin-bottom:20px; color:red">${responseR.name + ' '}</h5>
                                <img src="https://openweathermap.org/img/w/${responseR.weather[0].icon}.png" >
                                <h6 class="card-subtitle mb-2 text-muted">Temperature: ${responseR.main.temp}</h6>
                                <p class="card-text">Humidity: ${responseR.main.humidity}</p>
                                <p class="card-text">Wind Speed: ${responseR.wind.speed}</p>
                                <p class="card-text btn btn-danger btn-sm" style ='background-color:red; border-radius: 25px'>UV Index: ${responseR.coord.lat + responseR.coord.lon}</p>
                            </div>
                            </div>`

            weather.empty()
            weather.append(newCard)
        })
        //create another function where the api displays the weather results for the nxt 5 days beneath it
        var queryURLThree = 'https://openweathermap.org/data/2.5/forecast?q=' + city + 'us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22';
        $.ajax({
            url: queryURLThree,
            method: "GET"
        }).then(function (forecastResT) {
            console.log(forecastResT);
            console.log(queryURLThree);
            $('#fiveDay').empty();
            for (var i = 0; i < forecastResT.list.length; i++) {
                if (forecastResT.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    console.log(forecastResT.list[i].dt_txt.indexOf("12:00:00"))
                    var day = forecastResT.list[i].dt_txt.split(" ")  // "24-03-2019 15:00:00"  === index = 11
                    console.log("day: ", forecastResT.list[i].dt_txt, day)
                    var forecastNameS = $('<div class="col"><p>' + day[0] + '</p>')
                    // add icon logos based on their weather conditions

                    var imgOne = $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecastResT.list[i].weather[0].icon + ".png");
                    var tempFiveOne = $('<div id = "tempFive">' + 'Temperature: ' + forecastResT.list[i].main.temp + '<div>');
                    var humFiveOne = $('<div id = "humFive"> ' + 'Humidity: ' + forecastResT.list[i].main.humidity + '<div>');
                    console.log(forecastNameS.append(imgOne));
                    console.log(forecastNameS.append(tempFiveOne));
                    console.log(forecastNameS.append(humFiveOne));
                    console.log($('#fiveDay').append(forecastNameS));

                }
            }

        })
        //create a function for the search history using local storage
        function clear() {
            search.val('');


        }

       
    })

   
})
