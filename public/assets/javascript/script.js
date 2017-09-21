$(document).ready(function () {

    // Initialize Firebase
    
    var config = {
        apiKey: "AIzaSyAmiF7M0hKXDml6KxwP-00r4KBSBp6T-rk",
        authDomain: "tonedb-277ca.firebaseapp.com",
        databaseURL: "https://tonedb-277ca.firebaseio.com",
        projectId: "tonedb-277ca",
        storageBucket: "",
        messagingSenderId: "149316446558"
    };
    // starts the database
    firebase.initializeApp(config);
    const auth = firebase.auth();
    var firedb = firebase.database();
    var currentUserID = "";

    function settingCuser(useridsent) {
        currentUserID = useridsent;
    }
    //This is to push previous data



    //  form elements grabbed 
    var emailer = document.querySelector('#txtEmail');
    var passworder = document.querySelector('#txtPassword');
    var btnLogin = document.querySelector('#btnLogin');
    var btnSignup = document.querySelector('#btnSignup');
    var btnLogout = document.querySelector('#btnLogout');

    // past history arry
    var prevHistText = [];
    var prevHistData = [];
    var prevHistSocial = [];
    
    // chart array
    var chartData = [];
    var socialData = [];

    // destroy charts var 
   
    // login handler
    btnLogin.addEventListener('click', () => {
        const email = emailer.value;
        const pass = passworder.value;
        //   const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass).then((user) => {
            // console.log('user success', user);
            currentUserID = (user.uid);
            settingCuser(currentUserID);
            // console.log(currentUserID);
            // firebase.database().ref("users/"+currentUserID)
            // .set({
            //     previousData: "Users Data"
        })

        //    promise.catch(e => console.log(e.message)); 
        //   console.log(email);

        document.querySelector('#txtEmail').value = "";
        document.querySelector('#txtPassword').value = "";
    });

    //   signup handler
    btnSignup.addEventListener('click', () => {
        const email = emailer.value;
        const pass = passworder.value;
        // const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, pass).then((user) => {
            console.log('user success', user);
            currentUserID = (user.uid);
            settingCuser(currentUserID);
            console.log(currentUserID);
            firebase.database().ref("users/" + currentUserID)
                .set({
                    previousData: "Users Data"
                })


        })
            .catch((error) => {
                console.log('error', error);
                alert("Invalid username/password")
            });

            document.querySelector('#txtEmail').value = "";
            document.querySelector('#txtPassword').value = "";
    });


    // logs you out on load
// document.addEventListener('load',()=>{
//     firebase.auth().signOut().then(function () {
//         console.log("sign out successfully");
//         // Sign-out successful.
//     }).catch(function (error) {
//         // An error happened.
//     });
// })

// This function creates the past history charts.
function createEmoChart(data, num){


    var ctx3 = document.getElementById("myCharts" + num).getContext('2d');
    var myChart3 = new Chart(ctx3, {
        type: 'horizontalBar',
        data: {
            labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
            datasets: [{
                label: 'Emotional Tone',
                data: [data[4], data[3], data[2], data[1], data[0]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)'

                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 10,
                        fontSize: 15
                    }
                }],
                yAxes:[{
                    ticks: {
                        fontSize: 15
                    }
                }]
            }
        }
    });


    
}

function createSocialChart(data1, num1){
    
    
        var ctx4 = document.getElementById("myChartz" + num1).getContext('2d');
        var myChart4 = new Chart(ctx4, {
            type: 'horizontalBar',
            data: {
                labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "emotional range"],
                datasets: [{
                    label: 'Emotional Tone',
                    data: [data1[4], data1[3], data1[2], data1[1], data1[0]],
                    backgroundColor: [
                        'rgb(56, 198, 170)',
                        'rgb(56, 198, 170)',
                        'rgb(56, 198, 170)',
                        'rgb(56, 198, 170)',
                        'rgb(56, 198, 170)',
    
                    ],
                    borderColor: [
                        'rgb(56, 198, 170, 1)',
                        'rgb(56, 198, 170, 1)',
                        'rgb(56, 198, 170, 1)',
                        'rgb(56, 198, 170, 1)',
                        'rgb(56, 198, 170, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            max: 100,
                            min: 0,
                            stepSize: 10,
                            fontSize: 15
                        }
                    }],
                    yAxes:[{
                        ticks: {
                            fontSize: 15
                        }
                    }]
                }
            }
        });
    
    }


window.onbeforeunload = function(e) {
    firebase.auth().signOut().then(function () {
        console.log("sign out successfully");
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
  };

    btnLogout.addEventListener('click', () => {
        firebase.auth().signOut().then(function () {
            console.log("sign out successfully");
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    });

function retreiveData (something){
    var ref3 = firedb.ref("users/" + currentUserID + '/previousData');
    ref3.on('value', gotData, errData);

    function gotData(data) {
        //   //  the data comes back weird so you have to use .val to make it usable
          console.log(data.val());

        var entrieData = data.val();
        // //   // Here we are looking for the keys of scoreData
          var keys = Object.keys(entrieData);
          // clear divs
          document.querySelector('#prevSearch').innerHTML = "";
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var storedText = entrieData[k].entries.text
            var storedTones = entrieData[k].tones
            var storedSocial = entrieData[k].social
            // var scorrs = scores[k].scores
            console.log(storedText);
            console.log(storedTones);
            console.log(storedSocial);

            prevHistText.push(storedText);
            prevHistData.push(storedTones);
            prevHistSocial.push(storedSocial);

            var btn = document.createElement('BUTTON');
            btn.classList.add('btn', 'btn-info', 'historyBtn');
            btn.setAttribute('style', 'margin: 10px');
            btn.setAttribute('data', i);
            var str = storedText;
            if (str.length > 60) str = str.substring(0, 60);
            var t = document.createTextNode(str);
            btn.appendChild(t);
            document.querySelector('#prevSearch').appendChild(btn);

          }

        console.log("2", prevHistText);
        console.log("2", prevHistData);
        
        $('.historyBtn').on('click', function(){
            $('.chartSection3').html('');
            $('.chartSection2').html('');
            var j=0;
            var chartBtnVal = $(this).attr('data');
            // $('.history').empty().
            
            $('<canvas>').addClass('hisCharts').attr('id', 'myCharts' + j).attr('width', 400).attr('height', 400)
            .appendTo('.chartSection2');
            createEmoChart(prevHistData[chartBtnVal], j);
            $('<canvas>').addClass('hisCharts2').attr('id', 'myChartz' + j).attr('width', 400).attr('height', 400)
            .appendTo('.chartSection3');
            createSocialChart(prevHistSocial[chartBtnVal], j);
        
            
            j++;
        })


    }

    function errData(err) {
    }


}

    auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log("you are logged in ");
            btnLogout.classList.remove('hide');
       retreiveData (firebaseUser);
    

        } else {
            console.log("not logged in");
        }
    });






    // These variables are the arrays that we push the data from the Tone-analyzer and set into the charts.
   




    //creating an on click event for the submit button
    $('#submit').on('click', function () {
        //finding the value of text area and storing it in variable
        var text = $('textarea').val();

        event.preventDefault()

        // Disables the submit button until the clear button is pressed.
        document.getElementById("submit").disabled = true;


        // clearing the arrays for the charts.
        chartData = [];
        socialData = [];


        //creating an object for text

        var textTransfered = {
            text: text
        }


        //making an ajax request for the watson api
        $.ajax({
            type: 'POST',
            url: "/",
            data: textTransfered,
            success: function (incomingText) {
                // Data base injection


                incomingText = JSON.parse(incomingText);
                console.log(incomingText);


                for (var i = 0; i < 5; i++) {
                    // This is where we push the data from the JSON into an array for the chart to display.
                    chartData.unshift(incomingText.document_tone.tone_categories[0].tones[i].score * 100);
                    socialData.unshift(incomingText.document_tone.tone_categories[1].tones[i].score * 100);
                }


                for (var i = 0; i < chartData.length; i++) {
                    var element = chartData[i];
                    // console.log(element);

                }
                console.log("The current user is" + currentUserID);
                var ref = firedb.ref("users/" + currentUserID + '/previousData');
                var data = {
                    entries: textTransfered,
                    tones: chartData,
                    social: socialData
                }

                ref.push(data);

                ref.on('value', gotData, errData);


                function gotData(data) {
                    //  the data comes back weird so you have to use .val to make it usable
                    console.log(data.val());
                    // We are creating an object called stored data
                    var entrieData = data.val();
                    // Here we are looking for the keys of scoreData
                    var keys = Object.keys(entrieData)
                    for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        var storedText = entrieData[k].entries.text
                        var storedTones = entrieData[k].tones
                        var storedSocial = entrieData[k].social
                        // var scorrs = scores[k].scores
                        // console.log(storedTex);
                        // console.log(storedTones);
                    }
                }

                function errData(err) {
                    console.log('Err')
                }


                // delete entries on refresh
                document.addEventListener

                // This is our Emotion Tone Chart
                var ctx = document.getElementById("myChart").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: ["Anger", "Disgust", "Fear", "Joy", "Sadness"],
                        datasets: [{
                            label: 'Emotional Tone',
                            data: [chartData[4], chartData[3], chartData[2], chartData[1], chartData[0]],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(54, 162, 235, 0.2)'

                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderWidth: 1,
                          
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    stepSize: 10,
                                    fontSize: 15
                                    
                                }
                            }],
                            yAxes:[{
                                ticks: {
                                    fontSize: 15
                                }
                            }]
                        }
                    }
                });

                // This is our Social Tone Chart
                var ctx2 = document.getElementById("myChart2").getContext('2d');
                var myChart2 = new Chart(ctx2, {
                    type: 'horizontalBar',
                    data: {
                        labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "emotional range"],
                        datasets: [{
                            label: 'Social Tone',
                            data: [socialData[4], socialData[3], socialData[2], socialData[1], socialData[0]],
                            backgroundColor: [
                                'rgb(56, 198, 170)',
                                'rgb(56, 198, 170)',
                                'rgb(56, 198, 170)',
                                'rgb(56, 198, 170)',
                                'rgb(56, 198, 170)', ,

                            ],
                            borderColor: [
                                'rgb(56, 198, 170, 1)',
                                'rgb(56, 198, 170, 1)',
                                'rgb(56, 198, 170, 1)',
                                'rgb(56, 198, 170, 1)',
                                'rgb(56, 198, 170, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    stepSize: 10,
                                    fontSize: 15
                                }
                            }],
                            yAxes:[{
                                ticks: {
                                    fontSize: 15
                                }
                            }]
                        }
                    }
                });
                
            

                // This is our clear button
                $('#clear').on('click', function () {
                    event.preventDefault();
                    // This is where we empty the text box.
                    $('#comment').val('');

                    // This is where we clear the charts from the previous JSON.
                    myChart.destroy();
                    myChart2.destroy();

                    // This enables are submit button again when the clear button is submitted.
                    document.getElementById("submit").disabled = false;

                })

            }
        })


        //   This var is to store the pargraph the user is typing.   
        var grammarCheck = $("#comment").val();

        // This is the URL for the grammar API. 
        var theGramURL = "https://api.textgears.com/check.php?text=" + grammarCheck + "!&key=mwZOhaYBhL9f7Cje";

        // Ajax call and done function. 
        $.ajax({
            url: theGramURL,
            method: "GET"

        }).done(function (result) {
            // This var is for the result.
            var grammerJson = result.errors;

            console.log(grammerJson);
            // This is the for loop to search the JSON arrays from result and to add P elements to the page with the suggestions.
            for (var i = 0; i < 10; i++) {
                $("<p>")
                    .addClass("grammarCheck")
                    .html("Error: " + result.errors[i].bad)
                    .appendTo(".grammar")

                $("<p>")
                    .addClass("grammarCheck")
                    .html("Suggestions: " + result.errors[i].better)
                    .appendTo(".grammar")


            }


        })


    })


    $('#sub2').on('click', function () {

        $('.theSynonyms').empty();
        // This var is for the word the user is searching for and inputs in the input box.  
        var theWord = $("#synIn").val();

        // This is the URL for the word API. 
        var theURL = "http://words.bighugelabs.com/api/2/fabfe33879f5e6e03a459b5ccb98ece9/" + theWord + "/json";

        // Ajax call and done function. 
        $.ajax({
            url: theURL,
            method: "GET"

        }).done(function (result) {


            // Parsing the JSON object from the api. 
            var resultParse = JSON.parse(result);
            console.log(resultParse);
            // This var is for the array of synonyms we get from the JSON Object. 
            var theSynResult = resultParse.noun.syn;
            // This var is for the array of antonyms we get from the JSON Object. 
            var theAntResult = resultParse.noun.ant;

            // This for loop creats a P element for the first 5 results from the syn array.
            for (var i = 0; i < 3; i++) {
                $("<p>")
                    .addClass("theSynonyms")
                    .html("Synonym Noun: " + theSynResult[i])
                    .appendTo(".synAnt")
            }
            // This for loop creats a P element for the first 3 results from the ant array.
            for (var j = 0; j < 3; j++) {
                $("<p>")
                    .addClass("theSynonyms")
                    .html("Antonym: " + theAntResult[j])
                    .appendTo(".synAnt")
            }
        })
    })
})
