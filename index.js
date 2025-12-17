const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Load commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event listener
client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith("!")) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if(!command) return;

    try{
        await command.execute(message, args);
    }catch(err){
        console.error(err);
        message.reply("حدث خطأ أثناء تنفيذ الأمر!");
    }
});

// Login
client.login(process.env.BOT_TOKEN);
