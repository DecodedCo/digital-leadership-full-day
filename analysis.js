var doc;
var avgSentiment = 0;
var ibm_key = "YOUR KEY"
var mxmsg = 5;

/**************************

1. Extract text from tweets (getTweetText)
2. Get sentiment for first few tweets (getWatsonSentiment, avgSentiment)
3. Get the average sentiment (avgSentiment)
4. Depending on the average sentiment, display an appropriate emoticon. (displaySentiment)

**************************/

function displaySentiment(){


  calcAvgSentiment() //will set avgSentiment value

  setTimeout(function(){

    part1 = "Tweets & the mood is:<i class='fa-2x fa fa-";
    part2 = "-o' style='color:gold'></i><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css'>";

    if (avgSentiment < -0.1){ // sad

      $("#twitter-widget-0").contents().find(".timeline-Header-title").html(part1 + "frown" + part2)

    }else if (avgSentiment < 0.1){ //neutral

      $("#twitter-widget-0").contents().find(".timeline-Header-title").html(part1 + "meh" + part2)

    }else{ //happy

      $("#twitter-widget-0").contents().find(".timeline-Header-title").html(part1 + "smile" + part2)

    }

  }, 1500)

}

function calcAvgSentiment(){

  //Get the text from the tweets in the timeline
  var twitter_text = getTweetText();
  console.log("Tweets", twitter_text)
  
  
  //For the first few tweets, get the sentiment for each
  var tmpSentiment = 0
  for (i=0; i<mxmsg; i++){
    // sentiment of  current text
    var current_sentiment = getWatsonSentiment(twitter_text[i])
    // add this sentiment to the sentiment of all previous tweets
    tmpSentiment += current_sentiment
  }

  
  // now get the average sentiment.
  setTimeout(function(){
    avgSentiment = tmpSentiment/mxmsg  
  },1000)
  
}



//Function that connects to Alchemy
function getWatsonSentiment(text){
  var curr_res = 0;
	$.ajax({
        //watson/alchemy api endpoint:
        url: "https://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey="+ ibm_key + "&outputMode=json&text=" + text.replace("#","").replace("@",""),
        
        success: function(result){

          type = result.docSentiment.type 
          if (type == "neutral"){
          	return 0
          }else{
          	return parseFloat(result.docSentiment.score);
          }
          
        } // END success
    }); // END ajax 
}




function getTweetText(){

  // Extract all the html that twitter has sent back
  doc = $('#twitter-widget-0').contents()[0]
  
  // Identify the individual paragraphs that contain the text for each tweet
  texts = $(doc).find("p.timeline-Tweet-text")

  // Iterate over each paragraph to grab the text
  var rawText = []
  for (var p=0; p < texts.length; p++){
    rawText.push( $(texts[p]).text() )
  }

  return rawText;

}
