exports.screenshot = async function (pictureName,page,email) {
    await page.screenshot({path: `/accounts/${email}/${pictureName}`});
    console.log("‡‡‡ "+`accounts/${email}/${pictureName}`+" ‡‡‡")
}