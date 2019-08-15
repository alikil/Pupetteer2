const imaps = require('imap-simple')
const parse = require('../components/parser')
exports.Gmail = async(email,passToEmail,parseFirstPart,parseSecondPart,status) => {  
  return new Promise(async(resolve, reject) => {
    var config = {
      imap: {
        user: `${email}`,
        password: `${passToEmail}`,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 3000
      }
    };
    const connection = await imaps.connect(config)
    await connection.openBox('INBOX')
    var searchCriteria = [`${status}`]; 
    var fetchOptions = {bodies: ['HEADER', 'TEXT'],markSeen: false};  
    const results = await connection.search(searchCriteria, fetchOptions)
    var BodyTexts =  await results.map((res) => {
      return res.parts.filter((part) => {return part.which == 'TEXT'})
    });  
    var target = await JSON.stringify(BodyTexts).replace(/=\\r\\n/g,"").replace(/\\"/g,'"').replace(/\\r\\n/g,"").replace(/\=3D/g,'=')
    const readyLink = await parse.parse(target,parseFirstPart,parseSecondPart);
    resolve(readyLink)
  });
}