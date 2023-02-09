const { Client, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.on('ready', () => {
    console.log(`Logged in ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return;

    try {
        if(msg.content.startsWith('/generate')) {
            const prompt = msg.content.split(" ").slice(1).join(" ");
            //console.log("le prompt => ", prompt)
            const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "1024x1024"
            });
            const imageUrl = response.data.data[0].url;
            msg.reply(imageUrl);
        } else {
           // msg.reply(`Start the message like /generate ${msg.content}`)
        }
        
    } catch (error) {
        console.log("l'erreur => ", error.response)
    }

});

client.login(
    "MTA3MjgyMjQwODI5OTQyOTkxOA.GqtAkZ.ZpAejnCGvSFE_li1KXD2eT-DoItum3_bZEsYpk"
);