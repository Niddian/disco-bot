const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle('List of current commands')
        .setDescription(client.commands.map((val, index, arr) => {
            return `!${index}`;
        }))
        .setThumbnail(client.user.displayAvatarURL);

    msg.channel.send(embed);
}

module.exports.help = {
    name: "help"
}
