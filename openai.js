const  OpenAI  = require('openai');
require('dotenv').config();


const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

const categorizeEmail = async (content) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Categorize the following email content into one of these categories: Interested, Not Interested, More information. Email content: ${content}`,
    max_tokens: 50,
  });
  return response.data.choices[0].text.trim();
};

const generateReply = async (category) => {
  const promptMap = {
    'Interested': 'Generate a response asking for a demo call time.',
    'Not Interested': 'Generate a polite thank you response.',
    'More information': 'Generate a response asking for specific information they need.',
  };

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptMap[category],
    max_tokens: 100,
  });

  return response.data.choices[0].text.trim();
};

module.exports = { categorizeEmail, generateReply };
