import {
    Client,
    GatewayIntentBits,
    Partials,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
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
    if (interaction.isStringSelectMenu) {
        if (interaction.customId == "roles") {
            const select = new StringSelectMenuBuilder()
                .setCustomId("roles")
                .setPlaceholder("Select your roles!")
                .setMinValues(0)
                .setMaxValues(8)
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Announcer")
                        .setValue("announcer"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Mini-Game Official")
                        .setValue("minigame"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Runner")
                        .setValue("runner"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Awards Official")
                        .setValue("awards"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Rules Official")
                        .setValue("rules"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Trading Post Merchant")
                        .setValue("trading"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Cardboard Cutter")
                        .setValue("cardboard"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("Stand-In Candidate")
                        .setValue("standin")
                );

            const row = new ActionRowBuilder().addComponents(select);

            const idToRole = {
                runner: "1331349708068749322",
                announcer: "1331349560072601731",
                minigame: "1331349665119080620",
                awards: "1331349770131865782",
                rules: "1331349900348227644",
                trading: "1331350020372430848",
                cardboard: "1331350126333264002",
                standin: "1331350197791494245",
            };
            for (const [id, roleId] of Object.entries(idToRole)) {
                if (interaction.values.includes(id)) {
                    interaction.member.roles.add(roleId);
                    continue;
                }
                interaction.member.roles.remove(roleId);
            }
            interaction.update({
                content: "choose your volunteer roles",
                components: [row],
            });
            return;
        }
        if (interaction.customId == "cw") {
            const select = new StringSelectMenuBuilder()
                .setCustomId("cw")
                .setPlaceholder("Select your weekends!")
                .setMinValues(1)
                .setMaxValues(3)
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel("CW1")
                        .setValue("0"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("CW2")
                        .setValue("1"),
                    new StringSelectMenuOptionBuilder()
                        .setLabel("CW3")
                        .setValue("2")
                );

            const row = new ActionRowBuilder().addComponents(select);

            const roles = [
                "1331350334173348071",
                "1331350392717578260",
                "1331350441715568730",
            ];
            for (let i = 0; i < 3; i++) {
                if (interaction.values.includes(i.toString())) {
                    interaction.member.roles.add(roles[i]);
                    continue;
                }
                interaction.member.roles.remove(roles[i]);
            }
            interaction.update({
                content: "choose the weekend(s) you're volunteering for",
                components: [row],
            });
            return;
        }
    }
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.split(" ");

    const command = args.shift().substr(prefix.length);

    // command logic here
});

client.on("guildMemberAdd", async (member) => {
    console.log("member joined");
    member.roles.add("1331351910015434804");
});

client.login(config.token);
