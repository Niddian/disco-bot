const Discord = require('discord.js');
const token = require('./token.json');
const fs = require('fs');
const prefix = '!';


const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.err(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js');

    jsfiles.forEach(cmd => {
        let prop = require(`./commands/${cmd}`);
        client.commands.set(prop.help.name, prop);
        console.log(client.commands.get());
    });
});

client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
});

client.on('message', async (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === 'dm') {
        fs.writeFileSync('/tmp/test', `${msg.author.username}: ${msg.content}\n`, (err) => {
            if (err) { return console.log(err); }
            console.log(`Message Saved: ${msg.author.username}`);
        });
    }

    let msgAr = msg.content.split(' ');
    let cmd = msgAr[0];
    let args = msgAr.slice(1);

    if (!cmd.startsWith(prefix)) return;

    let cmdList = client.commands.get(cmd.slice(1));
    if (cmdList) { cmdList.run(client, msg, args); }

});

client.login(token.token);
