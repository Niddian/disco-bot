const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config/config.json');

const client = new Discord.Client();


client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
    // client.channels.find(x => x.name === 'bot-test').send('Hello! I\'m now connected!');
});
client.on('message', (msg) => {
    if (msg.author.bot) return;

    let prefix, msgAr, cmd, args, icon, cmdList;
    icon = client.user.displayAvatarURL;
    prefix = config.prefix;
    msgAr = msg.content.split(' ');
    cmd = msgAr[0];
    args = msgAr.slice(1);
    cmdList = config.commands;

    switch (cmd) {
        case cmdList.help:
            msg.channel.send(new Discord.RichEmbed()
                .setTitle('List of current commands')
                .setDescription('!help')
                .setThumbnail(icon)
            );
            break;
        case cmdList.bot_info:
            let embed = new Discord.RichEmbed()
                .setTitle('Bot Info')
                .setDescription('Generic Test Bot')
                .setAuthor('Niddian', 'https://pm1.narvii.com/6477/003bd5479ec28b00208afacf3c3e5f9f198f7450_128.jpg')
                // .setImage(icon)
                .setThumbnail(icon)
                .setColor('#f50057')
                .addField('Created On:', client.user.createdAt);
            msg.channel.send(embed);
            break;
        case cmdList.test:
            msg.channel.send("Okay");
            break;
    }
});

client.login(token.token);
