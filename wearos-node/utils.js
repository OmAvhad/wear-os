const axios = require('axios');

const gemini = async (myText, prompt) => {
	const response = await axios.post(
		'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
		{
            'contents': {
                'role': 'user',
                'parts': {
                'text': prompt + myText
                }
            },
            'tools': []
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
	const args = response.data.candidates[0].content.parts[0].text;
	return args;
}

exports.gemini = gemini;    