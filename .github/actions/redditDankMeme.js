const fetch = require('node-fetch');
const fs = require('fs'); 
const url = 'https://reddit.com/r/dankmemes/top.json';
fetch(url)
    .then(res => res.json())
    .then(data => {
        let memes = data.data.children;
        let chosenOne = Math.floor(Math.random()*memes.length);
        let chosenMeme = memes[chosenOne].data;
        let readmeString = `Hello there! <br>Here's a meme for you!<br>\r\n## `
        if(chosenMeme.link_flair_text)
            readmeString += `<span style="background-color: #24292e">`+ chosenMeme.link_flair_text +`</span> `;
        readmeString += chosenMeme.title+`<br>![meme](`+chosenMeme.url_overridden_by_dest+`)<br>\r\n`;
        readmeString += `[Link to Comments](https://reddit.com`+chosenMeme.permalink+`)`;       
        fs.writeFile("./README.md", readmeString, 'utf8',()=>{
            console.log("README updated successfully")
        })
    })
    .catch(err => console.log(err))
