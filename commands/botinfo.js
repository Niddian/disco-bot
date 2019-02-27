const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle('Bot Info')
        .setDescription('Generic Test Bot')
        .setAuthor('Niddian', 'https://pm1.narvii.com/6477/003bd5479ec28b00208afacf3c3e5f9f198f7450_128.jpg')
        .setThumbnail(client.user.displayAvatarURL)
        .setColor('#f50057')
        .addField('Created On:', client.user.createdAt);

    msg.channel.send(embed);
}

module.exports.help = {
    name: "botinfo"
}
