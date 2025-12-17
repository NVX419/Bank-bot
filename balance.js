const fs = require("fs");
const dataFile = "./bank.json";

module.exports = {
    name: "balance",
    description: "يعرض رصيدك في البنك",
    execute(message, args){
        if(!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "{}");

        const data = JSON.parse(fs.readFileSync(dataFile));
        const userId = message.author.id;

        if(!data[userId]) data[userId] = { balance: 0 };

        message.channel.send(`رصيدك الحالي: ${data[userId].balance} 💰`);
    }
}
