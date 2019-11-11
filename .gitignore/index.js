const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

const prefix = '*';

function sendError(message, description) {
    message.channel.send({embed: {
        color: 15158332,
        description:  ':x: ' + description
    }});
}

client.on("ready", function() {
    console.log("Prêt à fonctionné !")
});

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

//Message de Bienvenue
client.on('guildMemberAdd', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription('**Tu as rejoins le gang des pavutes  ** ' + member.user.tag)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('625773532940337175').send(embed)
})

//Message de Aurevoir
client.on('guildMemberRemove', function (member) {
    let embed = new Discord.RichEmbed()
        .setDescription('**fdp ta quitté la pavute gang  ** ' + member.user.username)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('625784830453481472').send(embed)
})
 
//8Ball
module.exports.run = (client, message, args) => {
    client.on('message', function (message) {
        const prefix = '*';
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)
     
        if (args[0].toLowerCase() === prefix + "8ball") {
            if (!args[1]) return message.channel.send("Veuillez **poser une question** :x:")
            let answers = ["Non :x:", "J'ai envie de dormir :zzz:", "Balec :face_palm:", "Peut être... :thinking:", "Absolument :interrobang:", "surement pas", "t'es un fdp", "je ne suis pas apte a répondre", "vos mieux que je ne réponde pas", "oulalaaaa faut pas qu'il sache", "rien à foutre", "sûrement", "abosulement", "bien sur", "bien sur que oui"," laisse moi tranquille"," arrête de me parler", "tu crois je vais répondre ou quoi", "tu as complétement résons", "exactement", "oui"];
            let question = args.slice(1).join(" ");
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setColor("ORANGE")
                .addField("Question :", question)
                .addField("Réponse :", answers[Math.floor(Math.random() * answers.length)]);
            message.channel.send(embed);
        }
    })
}

client.login(process.env.TOKEN);
