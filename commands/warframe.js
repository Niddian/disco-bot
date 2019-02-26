const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
    let embed = Discord.embed();
    msg.channel.send({
        files: ["https://i.pinimg.com/originals/73/0e/c2/730ec25b799058bf4468584ee5b33848.gif"]
    }).then(console.log("Showed " + msg.author.username + " their inner eye."));
}

module.exports.help = {
    name: "thirdeye"
}
