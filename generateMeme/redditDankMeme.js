const fetch = require('node-fetch');
const fs = require('fs'); 
const url = 'https://reddit.com/r/dankmemes/top.json';
fetch(url)
    .then(res => res.json())
    .then(data => {
        let memes = data.data.children;
        let chosenOne = Math.floor(Math.random()*memes.length);
        let chosenMeme = memes[chosenOne].data;
        let readmeString = `Hello there! <br>Here's a random dank meme for you from [r/dankmemes](https://reddit.com/r/dankmemes)!<br>\r\n## `
        if(chosenMeme.link_flair_text)
            readmeString += `<span style="background-color: #24292e">`+ chosenMeme.link_flair_text +`</span> `;
        readmeString += chosenMeme.title+`<br><img src="`+chosenMeme.url_overridden_by_dest+`" alt="meme" width="300"/>`+`)<br>\r\n`;
        readmeString += `[Link to Comments](https://reddit.com`+chosenMeme.permalink+`)<br>\r\n`;
	readmeString += `Memes are updated once a day using Github Actions`;
        fs.writeFile("./README.md", readmeString, 'utf8',()=>{
            console.log("README updated successfully")
        })
    })
    .catch(err => console.log(err))
