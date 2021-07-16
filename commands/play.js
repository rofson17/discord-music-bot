const discord = require("discord.js");
const ytdl = require('ytdl-core');
const ytseach = require('yt-search');


const validURL = (str) => {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}

const videoFinder = async (query) => {
    const result = await ytseach(query);
    return (result.videos.length > 1) ? result.videos[0] : null;
}


module.exports = {
    name: "play",
    description: "play youtube audio",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.reply("You are not connected with the voice channel ⁉");

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.reply("❌I don't have the permission");

        if (!permissions.has("SPEAK")) return message.reply("❌I don't have the permission");

        if (!args.length)
            return message.reply("❗❗ you need to tell me the name of the song or youtube link ");
        const connect = await voiceChannel.join();

        const audio = await videoFinder(args.join(" "));

        if (validURL(args[0])) {
            const msg = await message.channel.send("---- Playing the link ----");
            await msg.react("👍");
            await msg.react("👎");

            const stream = ytdl(args[0], { filter: "audioonly" });
            connect.play(stream, { seek: 0, volume: 1 });

        } else if (audio) {
            const stream = ytdl(audio.url, { filter: 'audioonly' });

            em = new discord.MessageEmbed().setTitle(`🎵 Name: ${audio.title}`).setColor("RANDOM").setDescription(audio.url).setURL(audio.url).setImage(audio.thumbnail).setFooter(`Timestamp: ${audio.timestamp}`)
            const msg = await message.channel.send(em);
            await msg.react("👍");
            await msg.react("👎");
            await connect.play(stream, { seek: 0, volume: 1 })
                .on('finish', () => {
                    message.channel.send("✔ finished song").then(msg => msg.delete({ timeout: 12000 }));
                    voiceChannel.leave();
                })

        } else {
            em = new discord.MessageEmbed().setTitle("Can't found the song ❕❗").setColor("RED");
            message.channel.send()
        }
    }
}