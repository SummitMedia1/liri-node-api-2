//node liri.js movie-this ''
//node liri.js spotify-this-song ''
//node liri.js my-tweets
console.log("Let's get started");

var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var fs = require('fs');
var liriCmd = process.argv[2];
var params = { screen_name: 'SummitMedia1' } && { count: 20 };


//Twitter section

function getTweets () {
	var twitterKeys = new twitter(keys.twitterKeys);
	 	twitterKeys.get('statuses/user_timeline', params, function(error, data, response) {
			 // console.log("error" + JSON.stringify(error));
			 if (!error) {
			 	console.log("=================================================================");
			 	console.log("Here are @SummitMedia1's latest tweets:");
					for(var i = 0; i < data.length; i++) {
						console.log ("_______________________________________________________");
	 					console.log ('@SummitMedia1 tweeted on: ' + data[i].created_at);
	 					console.log ('Message:' + data[i].text);
	 					}

}

});

}
// break;
//This is the end of Twitter GETS******************************************************************* 

//This is where Spotify begins *********************************************************************
function getSong() {
	var Spotify = require('node-spotify-api');
	var Song = process.argv[3];
	var spotify = new Spotify( { id: 'ecd01c4e787c4056b1ccc67960a3d179', secret: 'be85eaff2fea477a8eac9fab044152ba'} );
		// console.log("Spotify id and secret: " + JSON.stringify( spotify, null, 2));

     var newSong = 'ace+of+base+sign';
     if ( Song === undefined ) {
           Song = newSong;
      }
		        spotify.search({ type: 'track', query: Song }, function(err, data) {
		            if (err) {
		                console.log('The following error occurred: ' + err);
		                }
						for (var i = 0; i < data.tracks.items.length; i++) {
							var music = data.tracks.items[i];	
								console.log('-----------------------------------------------------------------' + '\r\n');
								console.log('Artist Name(s): ' + music.artists[0].name + ".\r\n");
								console.log('Song Name: ' + music.name + ".\r\n");
								console.log('Album Name: ' + music.album.name + ".\r+\n");
								console.log('Preview Song Url: ' + music.preview_url + ".\r\n");
								console.log("-----------------------------------------------------------------" + "\r\n");
						}
});
}
	//action statement, switch statement to declare what action to execute.
	switch(liriCmd){

		case 'my-tweets':
		getTweets();
		break;

		case 'spotify-this-song':
		getSong();
		break;

		case 'movie-this':
		aMovieForMe();
		break;

		case 'do-what-it-says':
		followTheTextbook();
		break;
		
	}


//******************************END OF SPOTIFY***************************************************

//******************************BEGIN OMDB*******************************************************
var omdbApi = require('omdb-client');

function aMovieForMe(body){
     var movieTitle = process.argv[3];
     var url = 'http://www.omdbapi.com/?t=' ;
     var attributes = '&y=&plot=short&r=json&tomatoes=true';
     var newMovieTitle = "Mr Nobody";
     	if ( movieTitle === undefined ) {
     		movieTitle = newMovieTitle;
     	}

     	var finalMovie = movieTitle;
     request( url + finalMovie + attributes + '40e9cece' ),
     	function (error, response, body) {
			console.log(movieTitle);
		
		console.log('------------------------- Movie Info ----------------------------');
		console.log('-----------------------------------------------------------------' + '\r\n');
	    console.log('Title: ' + body.title);
	    console.log('Release Year: ' + body.year);
	    console.log('IMdB Rating: ' + body.imdbRating);
	    console.log('Rotten Tomatoes Rating: ' + body.incTomatoes);
	    console.log('Produced In (Country): ' + body.country);
	    console.log('Language: ' + body.language);
	    console.log('Plot: ' + body.plot);
	    console.log('Actors: ' + body.actors);
	    console.log('-----------------------------------------------------------------' + '\r\n');
	    
	//     } else {
	//       console.log('Error occurred.'); 
 // }
};
}
