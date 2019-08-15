const faker = require('faker');
const fs = require('fs');
const logger = require('../components/loger')
exports.parseAcc = function(email,passtomail) {    
    return new Promise((resolve, reject) => {
        const accpre = fs.readFileSync(`./${email}/acc.txt`,'utf8')
        const user = JSON.parse(accpre)
        const accountNewData = [
            process.env.email = `${email}`,
            process.env.passtomail = `${passtomail}`,
            process.env.userName = user.userName,
            process.env.password = user.password,
            process.env.firstName = user.firstName,
            process.env.lastName = user.lastName,
            process.env.phoneNumber = user.phoneNumber,
            process.env.jobTitle = user.jobTitle,
            process.env.CompanyName = user.CompanyName
        ]
            logger.logger(user,email)
            logger.logger("Account Parsed",email)
            resolve(accountNewData);
    });
}
exports.createAcc = async function (email,passtomail) {
    return new Promise((resolve, reject) => {
        const userName = faker.internet.userName();
        const password = faker.internet.password();
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const phoneNumber = faker.phone.phoneNumberFormat(2);
        const jobTitle = faker.name.jobTitle();
        const CompanyName = faker.company.companyName();
        const accArray = {
            "status":"success",
            "email":`${email}`,
            "passtomail":`${passtomail}`,
            "userName":userName,
            "password":password,         
            "firstName":firstName,
            "lastName":lastName,
            "phoneNumber":phoneNumber,
            "jobTitle":jobTitle,
            "CompanyName":CompanyName
        }
        const accArrayWrite = JSON.stringify(accArray)
        fs.writeFile(`./${email}/acc.txt`, accArrayWrite, function(err) {if(err) {return console.log(err);}})
        logger.logger("Account Created",email)
        const accountNewData = [
            process.env.email = `${email}`,
            process.env.passtomail = `${passtomail}`,
            process.env.userName = userName,
            process.env.password = password,
            process.env.firstName = firstName,
            process.env.lastName = lastName,
            process.env.phoneNumber = phoneNumber,
            process.env.jobTitle = jobTitle,
            process.env.CompanyName = CompanyName
        ]
        resolve(accountNewData)
    });
}

