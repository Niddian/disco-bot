const botconfig = require('./botconfig.json');
const tokenfile = require('./token.json');
const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true });


bot.on('ready', async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("How To Act Like Human", { type: "WATCHING" })
});

//Listener Event: This runs everytime a message is received.
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    console.log("cmd: " + cmd)
    console.log("args: " + args)
    console.log("args join: " + args.join(" "))

    switch (cmd) {
        case `${prefix}serverinfo`:
            return message.channel.send(
                new Discord.RichEmbed()
                    .setDescription("Server Information")
                    .setColor('#20FF14')
                    .setThumbnail(message.guild.iconURL)
                    .addField("Server Name", message.guild.name)
                    .addField("Created On", message.guild.createdAt)
                    .addField("You Joined", message.member.joinedAt)
                    .addField("Total Members", message.guild.memberCount)
            );
        case `${prefix}botinfo`:
            return message.channel.send(
                new Discord.RichEmbed()
                    .setDescription("Bot Information")
                    .setColor('#20FF14')
                    .setThumbnail(bot.user.displayAvatarURL)
                    .addField("Bot Name", bot.user.username)
                    .addField("Created On", bot.user.createdAt)
            );
        case `${prefix}report`:
            //!report @exampleuser this is the reason
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
            if (!rUser) { return message.channel.send("Couldn't find user."); }
            let reason = args.join(" ").slice(22);

            message.delete().catch(O_o => { });

            let reportsChannel = message.guild.channels.find(`name`, "reports");
            if (!reportsChannel) return message.channel.send("Couldn't find reports channel.");

            reportsChannel.send(
                new Discord.RichEmbed()
                    .setDescription("Reports")
                    .setColor("#20FF14")
                    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
                    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
                    .addField("Channel", message.channel)
                    .addField("Time", message.createdAt)
                    .addField("Reason", reason)
            ); break;
    }
});

bot.login(tokenfile.token);
