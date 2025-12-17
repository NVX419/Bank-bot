const fs = require("fs");
const dataFile = "./bank.json";

module.exports = {
    name: "withdraw",
    description: "يسحب مبلغ من البنك",
    execute(message, args){
        if(!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "{}");

        const data = JSON.parse(fs.readFileSync(dataFile));
        const userId = message.author.id;
        const amount = parseInt(args[0]);

        if(isNaN(amount) || amount <= 0){
            return message.reply("ادخل مبلغ صحيح للسحب!");
        }

        if(!data[userId]) data[userId] = { balance: 0 };

        if(data[userId].balance < amount){
            return message.reply("رصيدك لا يكفي للسحب!");
        }

        data[userId].balance -= amount;

        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        message.channel.send(`تم سحب ${amount} 💰، رصيدك الآن: ${data[userId].balance}`);
    }
}
