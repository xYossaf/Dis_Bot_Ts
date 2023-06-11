"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regCMD = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const regCMD = (clientId) => {
    const commands = [];
    const foldersPath = node_path_1.default.join(__dirname, 'commands');
    const commandFolders = node_fs_1.default.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = node_path_1.default.join(foldersPath, folder);
        const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = node_path_1.default.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    rest.put(discord_js_1.Routes.applicationCommands(clientId), { body: commands }).then(() => console.log(`Successfully registered ${commands.length} application commands.`))
        .catch(console.error);
};
exports.regCMD = regCMD;
