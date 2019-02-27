const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
    let json = await fetch("https://drops.warframestat.us/data/modLocations.json")
        .then(res => res.json());
    json = json['modLocations'];
    let embed = new Discord.RichEmbed();
    let enemies = [];
    let chance = [];
    // console.log(json['modLocations'].filter(d => d.modName === 'Arcane Healing'));
    for (data in json) {
        if (!json.hasOwnProperty(data)) { continue; }
        for (mods in json[data]) {
            if (!json[data].hasOwnProperty(mods)) { continue; }
            if (!(json[data][mods] === args.join(" "))) { continue; }

            for (enemy in json[data]['enemies']) {
                if (!json[data]['enemies'].hasOwnProperty(enemy)) { continue; }
                // combo.push({ enemy: json[data]['enemies'][enemy]['enemyName'], chance: json[data]['enemies'][enemy]['chance'] });
                enemies.push(json[data]['enemies'][enemy]['enemyName']);
                chance.push(json[data]['enemies'][enemy]['chance']);
            }
        }
    }
    if (enemies.length === 0) {
        msg.channel.send(`'${args.join(' ')}' does not match any known mod names.`);
        return;
    }
    let combo = enemies.map((itm, i) => {
        return [itm, chance[i] + '%'];
    }).join('\n');

    embed.setTitle(args.join(" "))
        .setColor(0xAA00AA)
        .setImage()
        .setDescription(combo.split(',').join(' - '));
    msg.channel.send(embed);
}

module.exports.help = {
    name: "warframe"
}
