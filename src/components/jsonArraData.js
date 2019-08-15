const fs = require('fs');
const winston = require ('Winston');
const path = require('path');
exports.addData = async(email,passToEmail) => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: path.join(`../${email}`, '/log.txt')})
        ]
    })   
    const data = {"email":email,"pass":passToEmail}
    let datajson = await JSON.stringify(data)
    await fs.writeFile(`../${email}/readyMail.json`, datajson, function(err) {if(err) {return console.log(err);}});
    logger.info("Json Data Added")
}