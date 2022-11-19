require("dotenv").config();
import axios from 'axios'
import { Client } from 'discord.js'

// load
const {  CHANNEL_ID }: any = process.env

async function send(id: string , user: Client) {
    try {
        if(user && id){
            const ch: any = await user.channels.cache.get(CHANNEL_ID);
            await ch?.send(`https://twitter.com/i/web/status/${id}`);
        }else throw new Error("Missing parameter");
    }catch(err: any){
        console.log(err.message);
    }
}

export default {send};