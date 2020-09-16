const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); 

let memes;
let chosenMeme; 
let chosenOne;
let channel;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // initialise channel
    channel = client.channels.cache.get('755470352749953094');

    sendMeme();
});

client.on('message', msg => {
  if (msg.content === '$help') {
    msg.channel.send('Hi there, I help you approve your memes!');
  }
});
client.on('messageReactionAdd', (reaction, user) => {
    console.log(reaction.emoji);
    if(reaction.emoji.name === "👍") {
        writeReadme();
        client.destroy();
    }
    else if(reaction.emoji.name === "👎"){
        memes.splice(chosenOne, 1);
        sendMeme();
    }
});

const sendMeme = () => {
    if(memes.length == 0){
        channel.send("You don't like any of the top reddit dank memes");
        client.destroy();
    }
    chosenOne = Math.floor(Math.random()*memes.length);
    chosenMeme = memes[chosenOne].data;
    channel.send('Random meme', {files:[chosenMeme.url_overridden_by_dest]});        
}

const writeReadme = () => {
    let readmeString = `Hello there! <br>Here's a random dank meme for you from [r/dankmemes](https://reddit.com/r/dankmemes)!<br>\r\n##`
    if(chosenMeme.link_flair_text)
        readmeString += `<span style="background-color: #24292e">`+ chosenMeme.link_flair_text +`</span> `;
    readmeString += chosenMeme.title+`<br><img src="`+chosenMeme.url_overridden_by_dest+`" alt="meme" width="300"/>`+`)<br>\r\n`;
    readmeString += `[Link to Comments](https://reddit.com`+chosenMeme.permalink+`)<br>\r\n`;
    readmeString += `Memes are updated once a day using Github Actions`;
    fs.writeFile("./README.md", readmeString, 'utf8',() => {
        console.log("README updated successfully")
    })
}

const init = async () => {
    // fetch memes from reddit api
    const url = 'https://reddit.com/r/dankmemes/top.json';
    const response = await fetch(url)
    const data = await response.json()
    memes = await data.data.children

    // remove gifs from list of memes
    memes.forEach((meme, index) => {
        if(meme.data.url.indexOf(".gif") > -1){
            memes.splice(index,1)
        }
    })

    // intialize discord bot    
    client.login(process.env.DISCORD_BOT_KEY);
}

init();