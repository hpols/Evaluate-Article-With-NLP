// Import the js file to test
import { postText, handleSubmit } from "../formHandler.js"

// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", async() => {
        // Define the input for the function, if any, in the form of variables/array
		const data = {
			input: 'I like ice cream',
			lang: 'en'
		}
		
		// Define the expected output, if any, in the form of variables/array
		const output = {
			score_tag: 'P',
			agreement: 'AGREEMENT',
			subjectivity: 'SUBJECTIVE',
			confidence: '100',
			irony: 'NONIRONIC'
		}
		
	    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
	    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(postText('http://localhost:8081/meaning',data)).resolves.toEqual(output)	
	})
});