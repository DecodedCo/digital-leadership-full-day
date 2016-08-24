
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// optional code
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


yandex_key = "YOUR KEY"
microsoft_key = "YOUR KEY"

// GETTING THE TOTAL NUMBER OF ATTENDEES THAT HAVE CHECKED IN:

var total_attendees = 0

$.ajax({
  url:"https://api.decoded.com/checkin/test",
  success:function(data){
    console.log(data);
    for (obj in data){
      total_attendees += 1;
    }
  }
})

function translateTweets(){

  // Extract all the html that twitter has sent back
  doc = $('#twitter-widget-0').contents()[0]
  
  // Identify the individual paragraphs that contain the text for each tweet
  texts = $(doc).find("p.timeline-Tweet-text")

  // Iterate over each paragraph to grab the text
  for (var p=0; p < texts.length; p++){

      current_text = $(texts[p]).text().replace("#","").replace("@","").replace("&","")

      //remove any urls
      current_text = current_text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

      //remove hashtags
      var regexp = new RegExp('#([^\\s]*)','g');
      current_text = current_text.replace(regexp, '');

      api_url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + yandex_key
      api_url += "&text=" + current_text+ "&lang=en-ru"

      $.ajax({
        url:api_url,
        success:function(data){
          console.log(data["text"][0])
        }
      })  

  }

}


function checkImages(){

  // Extract all the html that twitter has sent back
  doc = $('#twitter-widget-0').contents()[0]
  
  // Identify the individual paragraphs that contain the text for each tweet
  texts = $(doc).find("p.timeline-Tweet-text")

  p = 0 
  current_text = $(texts[p]).text()
  url = current_text.match(/(https?:\/\/[^\s]+)/g)
  try{
    length(url) > 0:
    //check url against project oxford
    if (url.indexOf(".jpg") >=0 | url.indexOf(".jpeg") >=0 | url.indexOf(".png") >= 0){
      return projectOxford(url)
    }

  }catch{
    return null;
  }

} 

//modifying slightly from javascript code @ https://dev.projectoxford.ai/docs/services/5639d931ca73072154c1ce89/operations/563b31ea778daf121cc3a5fa
function projectOxford(img_url) {

    var params = {
        // Request parameters
    };
  
    $.ajax({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",microsoft_key);
        },
        type: "POST",
        // Request body
        data: "{'url':'"+img_url+"'}",
    })
    .done(function(data) {
        // alert("success");
        console.log(data[0]["scores"])
        return data[0]["scores"];
    })
    .fail(function() {
        console.log("error");
        return null;
    });
};
