const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// جمع كل الأوامر من نفس المجلد
client.commands = new Collection();
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'package.json');

for(const file of commandFiles){
    const command = require(`./${file}`);
    client.commands.set(command.name, command);
}

// حدث استقبال الرسائل
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

// تسجيل الدخول
client.login(process.env.BOT_TOKEN);
