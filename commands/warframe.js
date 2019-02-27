const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
    let json = await fetch("https://drops.warframestat.us/data/modLocations.json")
        .then(res => res.json());
    json = json['modLocations'];
    let embed = new Discord.RichEmbed()
        .setTitle("Warframe")
        .setColor(0xAA00AA)
        .setImage();
    // console.log(json['modLocations'].filter(d => d.modName === 'Arcane Healing'));
    for (data in json) {
        if (!json.hasOwnProperty(data)) { continue; }
        for (mods in json[data]) {
            if (!json[data].hasOwnProperty(mods)) { continue; }
            // console.log(json[data][mods])
        }
    }

    // Object.keys(json).forEach(key => {
    //     console.log(json[key]);
    // })
    // Object.entries(json['modLocations']).forEach(([key, value]) => {
    //     console.log(value)
    // });
    msg.channel.send(embed);
}

module.exports.help = {
    name: "warframe"
}
