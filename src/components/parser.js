exports.parse = (target,parseFirstPart,parseSecondPart) =>{
    return new Promise((resolve, reject) => {        
    regexnamereg = `${parseFirstPart}(.*?)${parseSecondPart}`  
    const matchtarget = target.match(regexnamereg)
    if (matchtarget == null){
        reject("null")
    } else {
        const parsedData = matchtarget[1].toString().trim()
        resolve(parsedData)
    }
    });
}