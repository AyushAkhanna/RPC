import { config } from "dotenv";
import { joinVoiceChannel } from "@discordjs/voice";
import { Client, RichPresence } from "discord.js-selfbot-v13";

config();

const client = new Client();

client.on("ready", async () => {
  const status = new RichPresence(client)
    .setParty({
      max: 9,
      current: 6,
    })
    .setName("1sT - Services")
    .setType("PLAYING") //PLAYING  STREAMING  LISTENING  WATCHING  CUSTOM  COMPETING
    .setState("with my future")
    .setDetails("I hate my life")
    .setAssetsLargeText("Pizza")
    .setAssetsSmallText("On Water")
    .setApplicationId("367827983903490050")
    .setStartTimestamp(new Date(Date.now()))
    .setURL("https://www.youtube.com/watch?v=xvFZjo5PgG0")
    .addButton("Github / Source Code", "https://github.com/PAINFUEG0/PAINFUEG0")
    .setAssetsLargeImage(
      "https://media.discordapp.net/attachments/1210593301552697396/1231198645412560987/pizza_water.gif?ex=663ea7d7&is=663d5657&hm=8edd5cf30b62bec69fcfb358a0f196664d882602c3cdef82c75b23e6457a9efe&=&width=375&height=375"
    )
    .setAssetsSmallImage(
      "https://media.discordapp.net/attachments/1210593301552697396/1231198645412560987/pizza_water.gif?ex=663ea7d7&is=663d5657&hm=8edd5cf30b62bec69fcfb358a0f196664d882602c3cdef82c75b23e6457a9efe&=&width=375&height=375"
    );

  client.user?.setPresence({ activities: [status] });

  console.log(`✅ :: Connected as : ${client.user?.username}`);

  let channel_id = process.env.Channel;

  if (channel_id) {
    const channel = client.channels.cache.get(channel_id);
    if (channel && channel?.isVoice()) {
      try {
        const connection = joinVoiceChannel({
          selfMute: false,
          selfDeaf: false,
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
        if (connection) console.log(`✅ :: Joined ${channel.name}`);
        else {
          console.log(
            `❌ :: Provide a valid channel ID if you want me to join VC`
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
});

client.login(process.env.Token).catch((err) => {
  console.log(`❌ :: ${err}`);
});
