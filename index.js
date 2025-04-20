import {
    Client,
    GatewayIntentBits,
    Partials,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags,
} from "discord.js";

import config from "./config.json" with { type: "json" };

const prefix = "!";

const client = new Client({
    intents: Object.values(GatewayIntentBits),
    partials: Object.values(Partials),
});

client.on("ready", async () => {
    console.log(`logged in as ${client.user.username}`);
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton) {
        if (interaction.customId == "dnd") {
            const role = "1363363336405909615";
            if (interaction.member.roles.cache.has(role)) {
                interaction.member.roles.remove(role);
                interaction.reply({
                    content: "role removed",
                    flags: MessageFlags.Ephemeral,
                });
                return;
            }
            interaction.member.roles.add(role);
            interaction.reply({
                content: "role given",
                flags: MessageFlags.Ephemeral,
            });
        }
    }
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.author.id != "377551134702829568") return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.split(" ");

    const command = args.shift().substr(prefix.length);

    // command logic here
    if (command == "a") {
        let button = new ButtonBuilder()
            .setCustomId("dnd")
            .setLabel("Add Role")
            .setStyle(ButtonStyle.Primary);
        let row = new ActionRowBuilder().addComponents(button);
        message.channel.send({ content: "get dnd role 🐉", components: [row] });
    }
});

// client.on("guildMemberAdd", async (member) => {
//     console.log("member joined");
//     member.roles.add("1331351910015434804");
// });

client.login(config.token);
