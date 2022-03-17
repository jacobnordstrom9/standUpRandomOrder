const { default: axios } = require('axios');
require('dotenv').config();

// variable that will get shuffled in below function.
var namesArray = ['Jacob', 'Keano', 'Chris', 'Tanner', 'Kyle', 'Darek', 'Eric', 'Steve', 'Matias'];

// Function that will shuffle the above array.
function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}
shuffleArray(namesArray);

// New shuffled array put in JSON format.
var names = JSON.stringify(namesArray);

// Formatting new JSON array
names = names.replace(/['"]+/g, '').replace('[', '').replace(']', '').split(',').join('\n');

// Function that will post the shuffled array into Slack.
const main = async () => {
  try {
    const payload = {
      attachments: [{ text: `:zap: Stand Up Order :zap: \n ${names}` }]
    };
    const options = {
      method: 'post',
      baseURL: process.env.WEBHOOK_API_KEY,
      data: payload
    };
    await axios.request(options);
  } catch (e) {
    const status = e.response.status;
    console.error(`There was an error, ${status}`);
  }
};
main();
