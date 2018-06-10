const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-378995197621-379748153542-VFLBeLwrpnvs7i7m4DurILpj',
  name: 'jokebot'
});

bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'general',
    'Get Ready to laugh with @Jokebot!',
    params
  );
});

//Error handler
bot.on('error', err => console.log(err));

//Message handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

// Response to data
function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  }
}

//Tell a Chuck Norris Joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random').then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
  });
}
