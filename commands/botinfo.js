const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle('Bot Info')
        .setDescription('Generic Discord Bot')
        .setAuthor('Niddian', 'https://avatars0.githubusercontent.com/u/28369836?s=460&v=4')
        .setThumbnail(client.user.displayAvatarURL)
        .setColor('#f50057')
        .addField('Created On:', client.user.createdAt);

    msg.channel.send(embed);
}

module.exports.help = {
    name: "botinfo"
}
