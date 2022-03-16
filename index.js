const { default: axios } = require('axios');
require('dotenv').config();

var namesArray = ['Jacob', 'Keano', 'Chris', 'Tanner', 'Kyle', 'Darek', 'Eric', 'Steve', 'Matias'];

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}
shuffleArray(namesArray);

var names = JSON.stringify(namesArray);
names = names.replace(/['"]+/g, '').replace('[', '').replace(']', '').split(',').join('\n');

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
