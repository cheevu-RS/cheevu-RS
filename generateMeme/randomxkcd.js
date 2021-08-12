const fetch = require('node-fetch');
const fs = require('fs').promises; 

let comic_url;
let count;
let image_url;


const writeReadme = async () => {
    let readmeString = `Hello there! <br>Here's a random xkcd comic!<br>\r\n## `
    readmeString += `<img src="`+image_url+`" alt="meme" width="400"/>`+`<br>\r\n`;
    readmeString += `Comics are updated once a day using Github Actions`;
    await fs.writeFile("./README.md", readmeString, 'utf8',() => {
        console.log("README updated successfully")
    })
}
const incrementXkcdCounter = async () => {
    count = await fs.readFile("./generateMeme/xkcdCounter");
    count++;
    await fs.writeFile("./generateMeme/xkcdCounter", count.toString());
}
const init = async () => {
    await incrementXkcdCounter();

    const number = Math.floor(Math.random()*count);
    const url = 'https://xkcd.com/'+number+"/";
    const response = await fetch(url)
    const data = await response.text()
    const pattern = "hotlinking\/embedding\\\): <a href= \"(.*)\"";
    // have to \\\ to escape special char in string regex pattern    
    image_url = data.match(pattern)[0].split('"')[1].split('"')[0];

    await writeReadme();

}

init();
