/* Global Variables */
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1';
const apiHolder = '?key=';
const queryHolder = '&of=json&txt='
const langHolder= '&lang=en';

function handleSubmit(event) {
    event.preventDefault()

    // get input from form field
    let formText = document.getElementById('name').value
	//send input to server for handling and retrieve result
	postText('/meaning', {
		input: formText
	})
	.then(function (res) {
		document.getElementById('score-result').textContent = res.score_tag;
		document.getElementById('agreement-result').textContent= res.agreement;
		document.getElementById('subjectivity-result').textContent = res.subjectivity;
		document.getElementById('confidence-result').textContent = res.confidence;
		document.getElementById('irony-result').textContent = res.irony;
		
		document.getElementById(results).style.display = inherit;
	})
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