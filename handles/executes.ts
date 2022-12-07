import { config } from 'dotenv'
config();
import {
    ChatInputCommandInteraction ,
    Collection ,
    SelectMenuBuilder ,
    ActionRowBuilder

} from "discord.js";
import { ICollection } from "monk";

import DB from '../database';
import Filter from '../models/filters'
import axios from 'axios';
import LOG from '../utils/logger'

const filters: ICollection = DB.get('filters');

const collection: any = new Collection();
const exec = {
    ping: async (interaction: ChatInputCommandInteraction) => {
        interaction.reply(`Pong !`)
    },
    remove_filter: async (interaction: ChatInputCommandInteraction) => {
        const filtersData = await filters.find();
        if(filtersData.length < 1){
            interaction.reply({content: `No Filters at database .`});
            return;
        }
        const selectMenu: SelectMenuBuilder = new SelectMenuBuilder()
            .setCustomId(`filters`)
            .setPlaceholder(`Select filter you want remove`)
        
        filtersData.map(v => {
            selectMenu.addOptions({
                label: v.value,
                value: v.filter_id
            })
        })

        const row: any = new ActionRowBuilder().addComponents(selectMenu);
            
        await interaction.reply({content: 'Under construction' , ephemeral: true , components: [row]});
    },
    add_filter: async (interaction: ChatInputCommandInteraction) => {
        const options: any = interaction.options.get('filter')
        const { FILTER_URL , TWITTER_TOKEN }: any = process.env;
        try {
            // applied new filter into twitter
            await axios.post(FILTER_URL , { 
                "add": [{ value: options?.value }]
             } , {
                headers: {
                  "Authorization":`Bearer ${TWITTER_TOKEN}`
                }});
                
            // request to get filter data on twitter
            const getReq = await axios.get(FILTER_URL , {
                headers: {
                    "Authorization":`Bearer ${TWITTER_TOKEN}`
                }
            })
            // get id based od getReq request response
            let savedID: string = "";
            if(getReq.data.data?.length > 1){
                getReq.data.data.map((v: any) => {
                    if(v.value == options.value) savedID = v.id;
                })
            }
            // save new filter into database
            const record: Filter    = new Filter(savedID , options.value);
            await filters.insert(record);
            LOG.success("Success add new filter");
            // reply on discord
            interaction.reply({content:'Successfully adding new filter !' , ephemeral: true})
        }catch(err: any){
            LOG.error(err.message)
            interaction.reply({content: `Failed adding new filter!` , ephemeral: true});
        }
    }
}

collection.set(`ping` , exec.ping);
collection.set(`remove_filter` , exec.remove_filter);
collection.set(`add_filter` , exec.add_filter);

export default collection;