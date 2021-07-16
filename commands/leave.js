const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    description: "leave the voice channel",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel)
            return message.reply("You are not connected with the voice channel ⁉");
        voiceChannel.leave();

        em = new MessageEmbed().setTitle("I am leaving now ✅").setColor("GOLD");
        message.channel.send(em);

    }
}