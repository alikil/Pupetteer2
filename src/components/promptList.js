const inquirer = require('inquirer')

module.exports.inquirerPromptList = function(base){
    baseArr = []
    answ = '';
    base.forEach(element => {baseArr.push(element.email);})
    var questions = [{
        type: 'input',
        name: 'email',
        choices: baseArr,
        message: baseArr,    
    }]
    inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    })
}


/*
async function dddddd (){
var promptList = require('./components/promptList');
const account = await promptList.inquirerPromptList(base)
await winston.info(answ);
}
dddddd ()
*/


