module.exports = {
    name: "help",
    description: "يعرض جميع أوامر البنك",
    execute(message, args){
        const helpMessage = `
**أوامر البوت:**
!balance - يعرض رصيدك
!deposit <amount> - يضيف مبلغ إلى البنك
!withdraw <amount> - يسحب مبلغ من البنك
!help - يعرض هذا الرسالة
`;
        message.channel.send(helpMessage);
    }
}
