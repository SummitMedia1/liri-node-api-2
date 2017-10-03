//node liri.js movie-this ''
//node liri.js spotify-this-song ''
//node liri.js my-tweets
console.log("Let's get started");

var keys = require('./keys.js');
var request = require('request');
var twitter = require('twitter');
var fs = require('fs');
var commands = process.argv.slice(3);
// var inquirer = require('inquirer');
// var command1 = commands[0];
// var command2 = commands[1];
var command3 = commands[3];
var liriCmd = process.argv[2];
var params = { screen_name: 'SummitMedia1' } && { count: 20 };

//Twitter section

function getTweets () {
	var twitterKeys = new twitter(keys.twitterKeys);
	 	twitterKeys.get('statuses/user_timeline', params, function(err, data, response) {
			 // console.log("error" + JSON.stringify(error));
			 if (!err) {
			 	console.log("=================================================================");
			 	console.log("Here are @SummitMedia1's latest tweets:");
					for(var i = 0; i < data.length; i++) {
						console.log("_______________________________________________________");
						console.log('Tweet Number: ' + (i+1));
	 					console.log('@SummitMedia1 tweeted on: ' + data[i].created_at);
	 					console.log('Message:' + data[i].text);
	 					fs.appendFileSync('log.txt', "=================================================================" + "\n\r");
			 			fs.appendFileSync('log.txt', "Here are @SummitMedia1's latest tweets:");
						fs.appendFileSync('log.txt', "_______________________________________________________" + "\n\r");
						fs.appendFileSync('log.txt', 'Tweet Number: ' + (i+1));
	 					fs.appendFileSync('log.txt', '@SummitMedia1 tweeted on: ' + data[i].created_at);
	 					fs.appendFileSync('log.txt', 'Message:' + data[i].text);
	 					}

}

});

}
// break;
//This is the end of Twitter GETS******************************************************************* 

//This is where Spotify begins *********************************************************************
function getSong(Song) {
	var Spotify = require('node-spotify-api');
	var Song = process.argv[3];
	var spotify = new Spotify( { id: 'ecd01c4e787c4056b1ccc67960a3d179', secret: 'be85eaff2fea477a8eac9fab044152ba'} );
		// console.log("Spotify id and secret: " + JSON.stringify( spotify, null, 2));

     var newSong = 'ace+of+base+sign';
     if ( !Song ) {
           Song = newSong;
      }
		        // var countEquals = { count: 3};
		        spotify.search({ type: 'track', query: Song }, function(err, data) {
		            if (err) {
		                console.log('The following error occurred: ' + err);
		                }
						for (var i = 0; i < 3; i++) {
							var music = data.tracks.items[i];	
								console.log('-----------------------------------------------------------------' + '\r\n');
								console.log('Artist Name(s): ' + music.artists[0].name + '.\r\n');
								console.log('Song Name: ' + music.name + '.\r\n');
								console.log('Album Name: ' + music.album.name + '.\r\n');
								console.log('Preview Song Url: ' + music.preview_url + '.\r\n');
								fs.appendFileSync('log.txt', '-----------------------------------------------------------------' + '\r\n');
								fs.appendFileSync('log.txt', '-----------------------------------------------------------------' + '\r\n');
								fs.appendFileSync('log.txt', 'Artist Name(s): ' + music.artists[0].name + '.\r\n');
								fs.appendFileSync('log.txt', 'Song Name: ' + music.name + '.\r\n');
								fs.appendFileSync('log.txt', 'Album Name: ' + music.album.name + '.\r\n');
								fs.appendFileSync('log.txt', 'Preview Song Url: ' + music.preview_url + '.\r\n');
								fs.appendFileSync('log.txt', "-----------------------------------------------------------------" + '\r\n');
						}
});
}

//******************************END OF SPOTIFY***************************************************

//******************************BEGIN OMDB*******************************************************
function getMovie() {

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
               console.log('---------------------------------------------------------');
               console.log("Year: " + movieData.Year);
               console.log('---------------------------------------------------------');
               console.log("IMDB Rating: " + movieData.imdbRating);
               console.log('---------------------------------------------------------');
               console.log("Country: " + movieData.Country);
               console.log('---------------------------------------------------------');
               console.log("Language: " + movieData.Language);
               console.log('---------------------------------------------------------' + '.\r\n');
               console.log("Plot: " + movieData.Plot + '.\r\n');
               console.log('---------------------------------------------------------');
               console.log("Actors: " + movieData.Actors);
               console.log('---------------------------------------------------------');
               console.log("Rotten Tomatoes Rating: " + movieData.tomatoUserRating);
               console.log('---------------------------------------------------------');
               console.log("Rotten Tomatoes URL: " + movieData.tomatoURL);
               console.log('---------------------------------------------------------');
            fs.appendFileSync('log.txt', '------------------------------------------------------------------');
			fs.appendFileSync('log.txt', 'Title: ' + movieData.Title + '.\r\n');	
			fs.appendFileSync(" ");					
			fs.appendFileSync('log.txt', "Release Year: " + movieData.Year + '.\r\n');
			fs.appendFileSync(" ");				
			fs.appendFileSync('log.txt', "IMdB Rating: " + movieData.imdbRating + '.\r\n');
			fs.appendFileSync(" ");			
			fs.appendFileSync('log.txt', "Rotten Tomatoes Rating: " + movieData.tomatoRating + '.\r\n');
			fs.appendFileSync(" ");
			fs.appendFileSync('log.txt', "Rotten Tomatoes URL: " + movieData.tomatoURL + '.\r\n');
			fs.appendFileSync(" ");	
			fs.appendFileSync('log.txt', "Country: " + movieData.Country + '.\r\n');
			fs.appendFileSync(" ");	
			fs.appendFileSync('log.txt', "Language: " + movieData.Language + '.\r\n');
			fs.appendFileSync(" ");	
			fs.appendFileSync('log.txt', "Plot: " + movieData.Plot + '.\r\n');
			fs.appendFileSync(" ");	
			fs.appendFileSync('log.txt', "Actors: " + movieData.Actors + '.\r\n');					
			fs.appendFileSync('log.txt', "------------------------------------------------------------------");
          } else {
               console.log(err);
          }

      });
}

//-----------------------------------------------------------------------------------------------------

//-----Do What It Says --------------------------------------------------------------------------------

// function readRandomText() {

		// }
	//action statement, switch statement to declare what action to execute.

	switch(liriCmd){            

			case 'my-tweets':
			getTweets();
			break;

			case 'spotify-this-song':
			getSong(dataArray[1]);
			break;

			case 'movie-this':
			getMovie(command3);
			break;

			case 'do-what-it-says':
			fs.readFile('random.txt', 'utf8', function(err, data) {
					if (err) {
						console.log('The following error occurred: ' + err);

					} else {
						var dataArray = data.split(",");
						        console.log(dataArray[1]);
						                	getSong(dataArray[1]);
										
					}
					// break;
				});
		}

			// default:
			// break;

//appends the arugments to the log.txt file
fs.appendFileSync('log.txt', process.argv + "\n");

