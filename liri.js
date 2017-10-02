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
						console.log("_______________________________________________________");
						console.log('Tweet Number: ' + (i+1));
	 					console.log('@SummitMedia1 tweeted on: ' + data[i].created_at);
	 					console.log('Message:' + data[i].text);
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
								console.log('Artist Name(s): ' + music.artists[0].name + '.\r\n');
								console.log('Song Name: ' + music.name + '.\r\n');
								console.log('AAlbum Name: ' + music.album.name + '.\r+\n');
								console.log('Preview Song Url: ' + music.preview_url + '.\r\n');
								console.log("-----------------------------------------------------------------" + '\r\n');
						}
});
}

//******************************END OF SPOTIFY***************************************************

//******************************BEGIN OMDB*******************************************************
// var omdbApi = require('omdb-client');

// function aMovieForMe(){
 	var movieTitle = process.argv[3];
 	var newMovieTitle = "Mr+Nobody";
 	if ( movieTitle === undefined ) {
 		movieTitle = newMovieTitle;
     }
     request('http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&tomatoes=true&apikey=40e9cece', 
     	function (err, response, body) {
     console.log("Movie Title: " + JSON.stringify( movieTitle, null, 2));      
      if (!err && response.statusCode == 200) {
               var movieData = JSON.parse(body);
               console.log('\r\n' + '---------------------------------------------------------');
               console.log("*********************************************************");
               console.log('----------- OMDB DATABASE MOVIE DATA RETRIEVAL-----------');
               console.log("*********************************************************");
               console.log('---------------------------------------------------------');
               console.log(" ");
               console.log("Title: " + movieData.Title);
               console.log("Year: " + movieData.Year);
               console.log("IMDB Rating: " + movieData.imdbRating);
               console.log("Country: " + movieData.Country);
               console.log("Language: " + movieData.Language);
               console.log("Plot: " + movieData.Plot);
               console.log("Actors: " + movieData.Actors);
               console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
               console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
               console.log('\r\n\r' + '--------------------------------------------------------');
          } else {
               console.log(err);
          }

      });

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
