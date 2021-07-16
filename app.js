const discord = require("discord.js");
const { prefix, token } = require('./config.json');
const fs = require('fs');
const { constants } = require("buffer");


const bot = new discord.Client();
bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (let file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}



bot.once('ready', () => {
    console.log(`logged in as ${bot.user.tag}`);
})

bot.once("disconnect", () => {
    console.log(`${bot.user.tag} is ofline`);
})


bot.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    embed = new discord.MessageEmbed().setTitle(`Welcom ${member.displayName}`).setDescription(`I am very glad to see you.Have fun with your friends in our discord server`).setColor("RANDOM");
    return await member.send(embed);
})


const queue = new Map();

bot.on('message', async (message) => {

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    let player;

    if (command === 'ping')
        return bot.commands.get("ping").execute(message, args);

    if (command === 'help' || command === 'h')
        return bot.commands.get('help').execute(message, prefix, bot.user.user);

    if (command === 'play' || command === 'p')
        return player = bot.commands.get('play').execute(message, args);


    if (command == 'leave' || command === 'l')
        return bot.commands.get('leave').execute(message, args);


})






bot.login(token);