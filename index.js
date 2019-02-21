const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config/config.json');
const fetch = require('node-fetch');

const client = new Discord.Client();
const prefix = config.prefix;


client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
    // client.channels.find(x => x.name === 'bot-test').send('Hello! I\'m now connected!');
});
client.on('message', async (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === 'dm') return;

    let msgAr, cmd, args, cmdList, icon;
    msgAr = msg.content.split(' ');
    cmd = msgAr[0];
    args = msgAr.slice(1);
    cmdList = config.commands;
    icon = client.user.displayAvatarURL;

    if (!cmd.startsWith(prefix)) return;

    switch (cmd) {
        case `${prefix}${cmdList.help}`:
            msg.channel.send(new Discord.RichEmbed()
                .setTitle('List of current commands')
                .setDescription('!help')
                .setThumbnail(icon)
            );
            break;
        case `${prefix}${cmdList.bot_info}`:
            msg.channel.send(new Discord.RichEmbed()
                .setTitle('Bot Info')
                .setDescription('Generic Test Bot')
                .setAuthor('Niddian', 'https://pm1.narvii.com/6477/003bd5479ec28b00208afacf3c3e5f9f198f7450_128.jpg')
                // .setImage(icon)
                .setThumbnail(icon)
                .setColor('#f50057')
                .addField('Created On:', client.user.createdAt)
            );
            break;
        case `${prefix}${cmdList.test}`:
            msg.guild.channels.find(channel => channel.name === 'bot-test').send("BIG OKAY");
            break;
        case `${prefix}${cmdList.warframe}`:

            break;
    }
});

client.login(token.token);
