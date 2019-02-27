const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
    if (args.length === 0) { return; }
    let json = await fetch("https://drops.warframestat.us/data/modLocations.json")
        .then(res => res.json())
        .then(data => data['modLocations']);
    let enemies = [];
    let chance = [];
    // console.log(json.filter(d => d.modName === 'Arcane Healing'));

    // TODO: Mod names are Pascal Case. Change the checks to ignore case.
    for (data in json) {
        if (!json.hasOwnProperty(data)) { continue; }
        for (mods in json[data]) {
            if (!json[data].hasOwnProperty(mods)) { continue; }
            console.log(JSON.stringify(json[data][mods]).toLowerCase() + '\n');
            if (!(json[data][mods] === args.join(" "))) { continue; }

            for (enemy in json[data]['enemies']) {
                if (!json[data]['enemies'].hasOwnProperty(enemy)) { continue; }
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

    let embed = new Discord.RichEmbed()
        .setTitle(args.join(" "))
        .setColor(0xAA00AA)
        .setImage()
        .setDescription(combo.split(',').join(' - '));
    msg.channel.send(embed);
}

module.exports.help = {
    name: "warframe"
}
