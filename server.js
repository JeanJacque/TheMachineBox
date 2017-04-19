// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Youtube
var fs = require('fs');
var youtubedl = require('youtube-dl');
var video = youtubedl('http://www.youtube.com/watch?v=hi4pzKvuEQM',
	// Optional arguments passed to youtube-dl.
	['--audio-format=mp3'],
  	// Additional options can be given for calling `child_process.execFile()`.
  	{ cwd: __dirname });

// Will be called when the download starts.
video.on('info', function(info) {
	console.log('Download started');
	console.log('filename: ' + info._filename);
	console.log('size: ' + info.size);
});

video.pipe(fs.createWriteStream('myvideo.mp3'));

var player = require('play-sound')(opts = {});

setTimeout(function(){
	player.play('myvideo.mp3', function(err){
		console.log(err);
	})
}, 20000)



// youtube.loadVideoById('hi4pzKvuEQM');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'client/dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

/**
* Get port from environment and store in Express.
*/
const port = process.env.PORT || '3000';
app.set('port', port);

/**
* Create HTTP server.
*/
const server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(port, () => console.log(`API running on localhost:${port}`));