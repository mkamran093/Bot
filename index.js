require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

async function getMeme() {
  try {
    const res = await axios.get("https://meme-api.com/gimme");
    return res.data.url;
  } catch (error) {
    console.error("Error fetching meme:", error);
    return null; // Return null in case of an error
  }
}

client.on("ready", async () => {
  console.log(`logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  if (msg.content === "Ping") {
    msg.reply("Pong!");
  } else if (msg.content.startsWith("!meme")) {
    msg.channel.send("Here is your meme");
    const img = await getMeme(); // Wait for the meme to be fetched
    if (img) {
      msg.channel.send(img);
    } else {
      msg.channel.send("Sorry, an error occurred while fetching the meme.");
    }
  }
});

client.login(process.env.CLIENT_TOKEN);
