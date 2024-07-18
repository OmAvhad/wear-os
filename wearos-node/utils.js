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
            },
            maxTokens: 100,
            responseType: 'text'
		}
	);
	const args = response.data.candidates[0].content.parts[0].text;
    // format the response remove ** // etc
    args = args.replace(/\*\*/g, '');
    args = args.replace(/\/\//g, '');
    args = args.replace(/_/g, '');
	return args;
}

exports.gemini = gemini;    