var doc;
var currSentiment = 0;
var ibm_key = "YOUR KEY"

var mxmsg = 5;


//////////////////////////////
// GEOLOCATION
//////////////////////////////

$("form").hide();

// Change the contents of the p#message to say "Please wait, enable geolocation to continue"
$("p#message").html("Please wait, enable geolocation to continue");

// Adapted html5 geolocation code from w3schools
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        $("p#message").html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude); 
  
  // Save user location as two variables: userLat & userLon
  var userLat = position.coords.latitude;
  var userLon = position.coords.longitude; 
  
  var targetLat = 53.471857;
  var targetLon = -2.299386;
  
  // Run the getDistance.. function using our variables as the arugments
  var distance = getDistanceFromLatLonInKm(userLat,userLon,targetLat,targetLon);
  
  // console log the distance variable
  console.log(distance);
  
  var radius = 0.01; // so this is actually 250 meters 
  
  // if statement to work out if the user is at the target location.
  if (distance > radius) {
    // Show the form
    $("form").show();
    $("p#message").html("Congratulations, you've arrived!");
  } else {
    // hide the form
    $("form").hide();
    $("p#message").html("Well that's a shame, you're not here yet. You are " + distance.toFixed(2) + "Km away");
  }
  
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// Run the function called getLocation
getLocation();

//////////////////////////////
// FORM CONTROL
//////////////////////////////

// 1. When someone submits a form:
jQuery("form").submit(function() {
    // 2. Perform an AJAX request ($ is a shortcut for jQuery):
    $.ajax({
        // 3. Where to send data: use the URL from the form's action attribute
        url: $("form").attr("action"),
        // 4. Send the username from the input
        data: { username: $("input[name=username]").val() },
        // 5. What to do if data submits successfully:
        success: function(result){
            console.log(result);
            // 6. Change the paragraph with an id 'message' to display a welcome message
            $("p#message").html("Hello there " + result.username + "! Number of checkins: " + result.checkIns);   
            // 7. Hide the form now the user has checked in
            $("form").hide();
            // 8. Once they have checked in, stop watching their position
            if (typeof watchUser != "undefined") 
                navigator.geolocation.clearWatch(watchUser);
        } // END success
    }); // END ajax
    
    // 9. Allow form to submit without reloading the page
    event.preventDefault();
}) // END submit

//////////////////////////////
// SENTIMENT ANALYSIS
//////////////////////////////

function calcSentiment(){
  //initialise sentiment at neutral
  currSentiment = 0;
  //extract twitter contents
  doc = $('#twitter-widget-0').contents()[0]
  texts = $(doc).find("p.timeline-Tweet-text")

  //iterate over each message text and ping Watson for sentiment
  for (i=0; i<Math.max(texts.length,mxmsg); i++){
    console.log($(texts[i]).text())
    //execute the sentiment function
    getSentiment($(texts[i]).text());

    if (i == Math.max(texts.length,mxmsg)-1){

      //waiting a moment for final watson call to finish
      setTimeout(function(){
      	currSentiment = 	currSentiment/i
    	  addSentiment(currSentiment);
        console.log("Final sentiment",currSentiment);
      },1000)
      
    }

  }
}

//Function that connects to Alchemy
function getSentiment(text){
  var curr_res = 0;
	$.ajax({
        //watson/alchemy api endpoint:
        url: "https://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey="+ ibm_key + "&outputMode=json&text=" + text.replace("#","").replace("@",""),
        
        success: function(result){

          //console.log(text);
          type = result.docSentiment.type 
          if (type == "neutral"){
          	currSentiment +=0
          }else{
          	currSentiment += parseFloat(result.docSentiment.score);
          }
          
        } // END success
    }); // END ajax 
}

//append sentiment icon to twitter feed
function addSentiment(sentiment){
  
  console.log("adding emoticon for sentiment",sentiment);
  
  //storing some strings to make code easier to read
  part1 = "Tweets & the mood is:<i class='fa-2x fa fa-";
  part2 = "-o' style='color:gold'></i><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css'>";      
  //if the sentiment is negative, add a frown:
  if (sentiment < -0.1){
  	
    	$("#twitter-widget-0").contents().find(".timeline-Header-title").html(part1 + "frown" + part2)
    
  } //if the sentiment is neutral, add 'meh':
  else if(sentiment < 0.1){
  
    	$("#twitter-widget-0").contents().find(".timeline-Header-title").html(part1 + "meh" + part2)

  }else{ //if the sentiment is negative, add a smile:
    	$("#twitter-widget-0").contents().find(".timeline-Header-title").html(part1 + "smile" + part2)

  }
}

//////////////////////////////
// Tech API
//////////////////////////////

function hitTech(myurl){
	$.ajax({
        url: myurl,
        success: function(result){
          console.log(result);
        } // END success
  }); // END ajax 
}