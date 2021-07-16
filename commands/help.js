const discord = require("discord.js");

module.exports = {
    name: "help",
    description: "help commnad",
    async execute(message, prefix, botName) {
        const em = new discord.MessageEmbed()
            .setTitle("!Help Commands")
            .setDescription(`See all commends for ${botName}`)
            .setColor("RANDOM")
            .addField("Play song", `${prefix}play <song name> or ${prefix}p <song name or link>`, true)
            .addField("leave  song", `${prefix}leave or l`, true)
        await message.channel.send(em);
    }
}