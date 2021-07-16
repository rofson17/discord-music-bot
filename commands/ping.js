module.exports = {
    name: "ping",
    description: "ping commmand",
    async execute(message) {
        await message.reply("pong")
    }
}