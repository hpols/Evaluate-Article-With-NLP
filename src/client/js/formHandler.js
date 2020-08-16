/* Global Variables */
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';
const apiHolder = '?key=';
const queryHolder = '&of=json&txt='
const langHolder= '&lang=en';

const fetch = require('node-fetch'); // for testing

function handleSubmit(event) {
    event.preventDefault()

    // get input from form field
	if(document.getElementById('name').value != '') { // ensure there is text to process
		let formText = document.getElementById('name').value;
	
		let langSelect = document.getElementById('lang-select').value;
		//send input to server for handling and retrieve result
		postText('http://localhost:8080/meaning', {
			input: formText,
			lang: langSelect
		})
		.then(function (res) {
			console.log(res);
			document.getElementById('score-result').textContent = res.score_tag;
			document.getElementById('agreement-result').textContent= res.agreement;
			document.getElementById('subjectivity-result').textContent = res.subjectivity;
			document.getElementById('confidence-result').textContent = res.confidence;
			document.getElementById('irony-result').textContent = res.irony;

			document.getElementById('results').style.display = 'inherit';
			document.getElementById('results-mes').style.display = 'none';
		})
		} else { // request user to enter text 
		document.getElementById('name').placeholder = 'Nothing to evaluate. Please enter your text and then try submitting again.'
	}
}

const postText = async (url =' ', data = {} ) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers : {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
		try { 
			const inputData = await response.json();
			return inputData;
		} catch (error) {
			console.log('error', error);
		}
}
export { handleSubmit }
export { postText }