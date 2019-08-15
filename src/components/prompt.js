var inquirer = require('inquirer');
exports.promptList = async(itemsarray) => {
return new Promise(async(resolve, reject) => {
    baseArr=[];
    itemsarray.forEach(part => {baseArr.push(part.Email);})
    const list =
    {
        type: 'list',
        name: 'account',
        message: 'Pick your email!',
        choices: baseArr
    }
    promptres = await inquirer.prompt([list])    
    const mail = itemsarray.filter(part => {return part.Email == promptres.account})
    const mailval = mail[0]
    resolve(mailval)
});
}