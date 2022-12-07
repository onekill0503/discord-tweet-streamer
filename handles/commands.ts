
import { config } from 'dotenv'
import { REST , Routes , SlashCommandBuilder } from 'discord.js'
import LOG from '../utils/logger'
import CMD from '../enum/command'

// load
config();
const { DC_TOKEN , CLIENT_ID , GUILD_ID } : any = process.env;
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(DC_TOKEN);

// every command into array
const commands: Array<any> = [];

// add command
commands.push({
    data: new SlashCommandBuilder()
            .setName(CMD.PING)
            .setDescription(`Replies with Pong!`)
})

commands.push({
	data: new SlashCommandBuilder()
		.setName(CMD.REMOVE_FILTER)
		.setDescription(`Remove specific filter`)
})

commands.push({
	data: new SlashCommandBuilder()
		.setName(CMD.ADD_FILTER)
		.setDescription(`Add new tweet filter`)
		.addStringOption(op => op
			.setDescription(`Filters Value`)
			.setName('filter')
			.setRequired(true)
		)
})

async function register() {

    const cmdData = [...commands.map(v => { return v.data.toJSON() })]

    try {
		LOG.loading(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: cmdData },
		);

		LOG.info(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}

export default {register};