const fs = require('fs');
const logger = require("./components/loger")
const baseCreator = require('./components/baseCreator');
const imapFilter = require('./components/imap');
const registrator = require('./components/registration')
const addJsonData = require('./components/jsonArraData')
const sleep = require("./components/sleep")

const getPage = async(targetPage) =>{

    if (!fs.existsSync(`/env/base.json`)) {
        console.log("add accounts in json to '/env/base.json' in root")
        process.exit()
    }
    const mailer = JSON.parse(fs.readFileSync(`/env/base.json`,'utf8'))    
    const [email,passToEmail] = [mailer.Email,mailer.Password]
    logger.logger("start!",email)

    console.log(email,passToEmail)

    const createPathAndFiles = () => {
        return new Promise((resolve, reject) => {
        if (!fs.existsSync(`/accounts/${email}`)){fs.mkdirSync(`/accounts/${email}`);}
        if (!fs.existsSync(`/accounts/${email}/acc.txt`)){fs.writeFile(`/accounts/${email}/acc.txt`, '', function(err) {if(err) {return console.log(err);}})} 
        if (!fs.existsSync(`/accounts/${email}/log.txt`)){fs.writeFile(`/accounts/${email}/log.txt`, '', function(err) {if(err) {return console.log(err);}})} 
        if (!fs.existsSync(`/accounts/${email}/readyMail.json`)){addJsonData.addData(email,passToEmail);}
        sleep.sleep(2000)
        resolve("ready")
    });
    }

await createPathAndFiles(email,passToEmail)    

const account = async(email,passToEmail) => {
    const acc = fs.readFileSync(`/accounts/${email}/acc.txt`,'utf8')
    if (acc.includes("success")){ 
        return accountp = await baseCreator.parseAcc(email,passToEmail)
    } else {
        return accountc = await baseCreator.createAcc(email,passToEmail)
    }
}
const logforreg = fs.readFileSync(`/accounts/${email}/log.txt`,'utf8')
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
await registrator.tmforumActivation(email,activated).then(()=> process.exit())
}    
getPage("https://www.tmforum.org/user-registration/");   



