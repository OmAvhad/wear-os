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
            maxTokens: 10
		}
	);
	const args = response.data.candidates[0].content.parts[0].text;
    // console.log(removeMarkdownFormatting(args));
    return removeMarkdownFormatting(args);
}

function removeMarkdownFormatting(text) {
    // Remove bold formatting (**)
    text = text.replace(/\*\*/g, '');

    // Remove bullet points
    text = text.replace(/^\s*[\*\-]\s+/gm, '');

    // Remove headings
    text = text.replace(/^#+\s+/gm, '');

    // remove /n
    text = text.replace(/\n/g, ' ');

    return text;
}


exports.gemini = gemini;    