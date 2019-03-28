const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
    if (args.length === 0) { return; }
    let json = await fetch('https://drops.warframestat.us/data/modLocations.json')
        .then(res => res.json())
        .then(data => data['modLocations']);
    let enemies = [], chance = [];
    let modName, modImg;
    // console.log(json.filter(d => d.modName === 'Arcane Healing'));

    for (data in json) {
        if (!json.hasOwnProperty(data)) { continue; }
        for (mods in json[data]) {
            if (!json[data].hasOwnProperty(mods)) { continue; }
            mod = JSON.stringify(json[data][mods]).replace(/\"/g, '');
            modLower = mod.toLowerCase();
            if (!(modLower === args.join(' ').toLowerCase())) { continue; }

            for (enemy in json[data]['enemies']) {
                if (!json[data]['enemies'].hasOwnProperty(enemy)) { continue; }
                enemies.push(json[data]['enemies'][enemy]['enemyName']);
                chance.push(json[data]['enemies'][enemy]['chance']);
            }
            modName = mod;
        }
    }
    if (enemies.length === 0) {
        msg.channel.send(`'${args.join(' ')}' does not match any known mod names.`);
        return;
    }
    json = await fetch(`https://warframe.fandom.com/api.php?action=query&list=allimages&aiprefix=${modName.replace(/ /g, '')}ModU&prop=images&format=json`)
        .then(res => res.json())
        .then(data => data['query']['allimages']);
    if (json.length === 0) {
        json = await fetch(`https://warframe.fandom.com/api.php?action=query&list=allimages&aiprefix=${modName.replace(/ /g, '')}Mod&prop=images&format=json`)
            .then(res => res.json())
            .then(data => data['query']['allimages']);
    }
    for (data in json) {
        if (!json.hasOwnProperty(data)) { continue; }
        modImg = json[data].url;
    }
    let combo = enemies.map((itm, i) => {
        return [chance[i] + '%', itm];
    }).join('\n');
    let embed = new Discord.RichEmbed()
        .setAuthor('Lotus', 'https://vignette.wikia.nocookie.net/warframe/images/4/4d/Photo-4.png/revision/latest?cb=20131119220124')
        .setTitle(modName)
        .setColor(0xAA00AA)
        .setThumbnail(modImg)
        .setDescription(combo.split(',').join(' - '));
    msg.channel.send(embed);
}

module.exports.help = {
    name: "warframe"
}
