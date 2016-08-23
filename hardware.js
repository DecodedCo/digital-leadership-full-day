

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