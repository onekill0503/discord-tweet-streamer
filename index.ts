// set up env variabel
require("dotenv").config();
const {
  DC_TOKEN ,
  TWITTER_TOKEN,
  STREAM_URL,
  FILTER_URL
}: any = process.env;

import axios from "axios";
import { ActivityType, Client  , Events, Message , ChatInputCommandInteraction } from "discord.js"
import it from './utils/intents'
import { Buffer } from 'buffer'
import dc from './handles/message'
import cmd from './handles/commands'
import exec from './handles/executes'
import LOG from './utils/logger'
import Filter from "./models/filters";
import DB from './database'
import { ICollection } from "monk";
const filters: ICollection = DB.get('filters');

const client: Client = new Client({ intents: [it] });

client.on("ready", async () => {
  LOG.info(`Logged in as ${client.user?.tag}!`);
  // set up presence
  client?.user?.setPresence({ activities: [{ name: 'Streaming Airdrop at Twitter', type: ActivityType.Streaming }], status: 'dnd' });

  // start stream twitter tweet data
  LOG.loading(`Send stream request`);
  // const response = await axios.get(STREAM_URL ,{
  //       responseType: 'stream',
  //       headers: {
  //           "Authorization":`Bearer ${TWITTER_TOKEN}`
  //       }
  //   })
  // LOG.success(`Success send stream request`);
  // // create function to handle data received from streaming
  // response.data.on("data" , (data: any) => {
  //   const cvdata: Buffer = Buffer.from(data);
  //   if((Buffer.from([0xd, 0xa])).toString() !== cvdata.toString()){
  //     // declare new variable with type any
  //     let parsed: any;
  //     try{
  //       // parsed streamed data into json
  //       parsed = JSON.parse(cvdata.toString());
  //       // send tweet to specific discord channel
  //       dc.send(parsed?.data?.id , client);
  //     }catch(err: any){
  //       LOG.error(err.message);
  //     }
  //   }
  // })
  // // function running when streaming ended
  // response.data.on('end', () => {
  //       LOG.info(`Twitter Stream Ended.`)
  // });

  // register slash commands
  await cmd.register();

});

client.on(Events.MessageCreate , async (msg: Message) => {
  // LOG(msg.content);
} )

client.on(Events.InteractionCreate , async (interaction: any) => {

  if(interaction.isSelectMenu()){
    const id: string = interaction.values[0];
    try {
      // delete filter from twitter server
      await axios.post(FILTER_URL, {
        "delete": {
          "ids": [id]
        }
      } , {
        headers: {
          "Authorization":`Bearer ${TWITTER_TOKEN}`
        }
      });
      // delete data from local database
      await filters.remove({ filter_id: id })
      LOG.success("Successfully delete selected filter !")
      interaction.reply({content: `Succesfully deleting selected filter` , ephemeral: true})
    }catch(err: any){
      LOG.error(err.message);
		  interaction.reply({ content: `Failed removing filter`, ephemeral: true });
    }
    return;
  }

  const execute: Function = exec.get(interaction.commandName);
  if(!execute) {
    LOG.error(`No command matching ${interaction.commandName} was found.`);
		interaction.reply({ content: `No command matching ${interaction.commandName} was found.`, ephemeral: true });
  }

  try {
		execute(interaction);
	} catch (err: any) {
    LOG.error(err.message)
		interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

})

client.login(DC_TOKEN);