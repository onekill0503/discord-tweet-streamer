import { ChatInputCommandInteraction } from "discord.js";
import LOG from '../../utils/logger'
import axios from 'axios';
import Filter from '../../models/filters'
import { ICollection } from "monk";
import DB from '../../database';

const filters: ICollection = DB.get('filters');

export default async (interaction: ChatInputCommandInteraction) => {
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