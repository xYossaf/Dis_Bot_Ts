"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_commands_1 = require("../deploy-commands");
const { Events } = require('discord.js');
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        (0, deploy_commands_1.regCMD)(client.user.id);
    },
};
