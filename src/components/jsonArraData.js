const fs = require('fs');
const winston = require ('winston');
const path = require('path');
exports.addData = async(email,passToEmail) => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: path.join(`/accounts/${email}`, '/log.txt')})
        ]
    })   
    const data = {"email":email,"pass":passToEmail}
    let datajson = await JSON.stringify(data)
    await fs.writeFile(`/accounts/${email}/readyMail.json`, datajson, function(err) {if(err) {return console.log(err);}});
    logger.info("Json Data Added")
}