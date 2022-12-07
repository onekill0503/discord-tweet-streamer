require("dotenv").config();
import { Client } from 'discord.js'
import LOG from '../utils/logger'

// load
const {  CHANNEL_ID }: any = process.env

async function send(id: string | undefined , user: Client) {
    if(!id) return;
    try {
        if(user && id){
            const ch: any = await user.channels.cache.get(CHANNEL_ID);
            await ch?.send(`https://twitter.com/i/web/status/${id}`);
        }else throw new Error("Missing parameter");
    }catch(err: any){
        LOG.error(err.message);
    }
}

export default {send};