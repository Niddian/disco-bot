const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, msg, args) => {
    if (args.length === 0) { return; }
    let modName, modImg;
    let modList = [];

    let json = await fetch('https://drops.warframestat.us/data/modLocations.json')
        .then(res => res.json())
        .then(data => data['modLocations']);
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
                let foe = json[data]['enemies'][enemy]['enemyName'];
                let chance = json[data]['enemies'][enemy]['chance'];
                modList.push({ foe, chance });
            }
            modName = mod;
        }
    }

    if (modList.length === 0) {
        msg.channel.send(`'${args.join(' ')}' does not match any known mod names.`);
        return;
    }

    let imgJSON = await fetch(`https://warframe.fandom.com/api.php?action=query&list=allimages&aiprefix=${modName.replace(/ /g, '')}ModU&prop=images&format=json`)
        .then(res => res.json())
        .then(data => data['query']['allimages']);
    if (imgJSON.length === 0) {
        imgJSON = await fetch(`https://warframe.fandom.com/api.php?action=query&list=allimages&aiprefix=${modName.replace(/ /g, '')}Mod&prop=images&format=json`)
            .then(res => res.json())
            .then(data => data['query']['allimages']);
    }

    for (data in imgJSON) {
        if (!imgJSON.hasOwnProperty(data)) { continue; }
        modImg = imgJSON[data].url;
    }

    let combo = '';
    modList.sort((a, b) => { return b.chance > a.chance ? 1 : -1; })
    for (mod of modList) {
        combo += `${mod.chance}% - ${mod.foe}\n`;
    }

    let embed = new Discord.RichEmbed()
        .setAuthor('Lotus', 'https://vignette.wikia.nocookie.net/warframe/images/4/4d/Photo-4.png/revision/latest?cb=20131119220124')
        .setTitle(modName)
        .setColor(0xAA00AA)
        .setThumbnail(modImg)
        .setDescription(combo);

    msg.channel.send(embed);

}

module.exports.help = {
    name: "warframe"
}
