exports.screenshot = async function (pictureName,page,email) {
    await page.screenshot({path: `../${email}/${pictureName}`});
    console.log("‡‡‡ "+`${email}/${pictureName}`+" ‡‡‡")
}