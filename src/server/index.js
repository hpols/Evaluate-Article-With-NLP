const dotenv = require('dotenv');
dotenv.config();
const meaningCloud = require('meaning-cloud')
const fetch = require('node-fetch');

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

/*adding*/
const bodyPaser = require('body-parser')
const cors = require('cors')

const app = express()
/*adding*/
app.use(cors())
app.use(bodyPaser.json()) //for json
app.use(bodyPaser.urlencoded( { // for url-encoded values
	extended: true
}))

app.use(express.static('dist'))

const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';
const apiHolder = '?key=';
const queryHolder = '&of=json&txt='
const langHolder= '&lang=';

app.post('/meaning', async function(req, res){
	const request = await fetch (baseUrl + apiHolder + process.env.API_KEY + queryHolder + req.body.input + langHolder + req.body.lang)
	try {
			const receivedData = await request.json();
			console.log(baseUrl + apiHolder + process.env.API_KEY + queryHolder + req.body.input + langHolder + req.body.lang + '/' + receivedData);
			res.send(receivedData);
		} catch (error) {
			console.log('error', error);
			//TODO: send something back to flag the error
		}
})



console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})