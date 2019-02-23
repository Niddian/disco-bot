const Discord = require('discord.js');
const token   = require('./token.json');
const config  = require('./config/config.json');
const fs      = require('fs');


const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const prefix = config.prefix;

fs.readdir('./commands/', (err, files) => {
    if (err) console.err(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    
    jsfiles.forEach(cmd => {
        let prop = require(`./commands/${cmd}`);
        client.commands.set(prop.help.name, prop);
    });
});

client.on('ready', () => {
    console.log(`${client.user.username} is ready!`);
    // client.channels.find(x => x.name === 'bot-test').send('Hello! I\'m now connected!');
});

client.on('message', async (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === 'dm') return;

    let msgAr = msg.content.split(' ');
    let cmd = msgAr[0];
    let args = msgAr.slice(1);

    if (!cmd.startsWith(prefix)) return;

    let cmdList = client.commands.get(cmd.slice(1));
    if (cmdList) { cmdList.run(client, msg, args); }

    // switch (cmd) {
    //     case `${prefix}${cmdList.help}`:
            
    //         break;
    //     case `${prefix}${cmdList.bot_info}`:
    //         let embed = new Discord.RichEmbed()
    //             .setTitle('Bot Info')
    //             .setDescription('Generic Test Bot')
    //             .setAuthor('Niddian', 'https://pm1.narvii.com/6477/003bd5479ec28b00208afacf3c3e5f9f198f7450_128.jpg')
    //             // .setImage(icon)
    //             .setThumbnail(icon)
    //             .setColor('#f50057')
    //             .addField('Created On:', client.user.createdAt);
	//         msg.channel.send(embed);
    //         break;
    //     case `${prefix}${cmdList.test}`:
    //         msg.guild.channels.find(channel => channel.name === 'bot-test').send("BIG OKAY");
    //         break;
    //     case `${prefix}${cmdList.warframe}`:

    //         break;
    // }
});

client.login(token.token);
