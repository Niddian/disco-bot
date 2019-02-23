const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    let icon = client.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
        .setTitle('List of current commands')
        .setDescription('!help\n!botinfo\n!ping\n!warframe')
        .setThumbnail(icon);

    msg.channel.send(embed);
}

module.exports.help = {
    name: "help"
}
