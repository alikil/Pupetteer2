const fs = require('fs');
const logger = require("./components/loger")
const baseCreator = require('./components/baseCreator');
const imapFilter = require('./components/imap');
const registrator = require('./components/registration')
const addJsonData = require('./components/jsonArraData')
const prompt = require("./components/prompt")
const sleep = require("./components/sleep")

const getPage = async(targetPage) =>{

    if (!fs.existsSync(`./base.json`)) {
        console.log("add accounts in json to 'base.json' in root")
        process.exit()
    }
    const EmailList = JSON.parse(fs.readFileSync(`./base.json`,'utf8'))    
    const mailer = await prompt.promptList(EmailList)
    const [email,passToEmail] = [mailer.Email,mailer.Password]
    logger.logger("start!",email)

    const createPathAndFiles = () => {
        return new Promise((resolve, reject) => {
        if (!fs.existsSync(`./${email}`)){fs.mkdirSync(`./${email}`);}
        if (!fs.existsSync(`./${email}/acc.txt`)){fs.writeFile(`./${email}/acc.txt`, '', function(err) {if(err) {return console.log(err);}})} 
        if (!fs.existsSync(`./${email}/log.txt`)){fs.writeFile(`./${email}/log.txt`, '', function(err) {if(err) {return console.log(err);}})} 
        if (!fs.existsSync(`./${email}/readyMail.json`)){addJsonData.addData(email,passToEmail);}
        sleep.sleep(2000)
        resolve("ready")
    });
    }

await createPathAndFiles(email,passToEmail)    

const account = async(email,passToEmail) => {
    const acc = fs.readFileSync(`./${email}/acc.txt`,'utf8')
    if (acc.includes("success")){ 
        return accountp = await baseCreator.parseAcc(email,passToEmail)
    } else {
        return accountc = await baseCreator.createAcc(email,passToEmail)
    }
}
const logforreg = fs.readFileSync(`./${email}/log.txt`,'utf8')
await account(email,passToEmail)
if (!logforreg.includes("Reg Complete!")){
    await registrator.tmforum(targetPage,email)
}
const activationLink = () => {
return new Promise(async(resolve, reject) => {
        logger.logger("Wait for mail 20 secs",email)
        sleep.sleep(2000)        
        var [parseFirstPart,parseSecondPart] = ['e;" href="','"']
        const LinkRes = await imapFilter.Gmail(email,passToEmail,parseFirstPart,parseSecondPart,"UNSEEN")          
        if (LinkRes == "null"){
            logger.logger("Activation link not ready in email Or mail already SEEN"); 
            reject("null")       
        } else {
            logger.logger("Activation Link",email)            
            logger.logger("Activation Link =>"+LinkRes,email)
            resolve(LinkRes)
            }
    });
}
const activated = await activationLink()
await registrator.tmforumActivation(email,activated)
}    
getPage("https://www.tmforum.org/user-registration/");   



