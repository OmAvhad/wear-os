const axios = require('axios');

const gemini = async (myText, myFunction) => {
	const response = await axios.post(
		'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
		{
            'contents': {
                'role': 'user',
                'parts': {
                'text': myText
                }
            },
            'tools': [
                {
                'function_declarations': [
                    myFunction
                ]
                }
            ]
            },
            {
            params: {
                'key': "AIzaSyBs3ybPoA-0CrzRcDiMCH3fOBVc-_e7n6c"
            },
            headers: {
                'Content-Type': 'application/json'
            }
		}
	);
    console.log(response.data.candidates[0].content.parts[0])
	const args = response.data.candidates[0].content.parts[0].text;
	return args;
}

exports.gemini = gemini;    