const discord = require('discord.js');
const fs = require('fs');

const client = new discord.Client();
const token = ini.parse(fs.readFileSync('./token.ini', 'utf-8'));

client.on('ready', () => {
    console.log('Disco-Bot is ready!');
    client.channels.find(x => x.name === 'test').send('Hello! I\'m now connected!');
});

client.login(token);
