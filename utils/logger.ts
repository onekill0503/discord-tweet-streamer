import DB from '../database';
import { ICollection } from 'monk'
import Log from '../models/logs'
import logEnum from "../enum/log"

const LOG: ICollection = DB.get('logs');

export default {
    info    : (T: any) => console.log(`[i] ${T}`),
    success : (T: any) => {
        console.log(`[#] ${T}`)
        const record: Log = new Log(logEnum.SUCCESS , T);
        LOG.insert(record);
    },
    error   : (T: any) => {
        console.error(`[x] ${T}`)
        const record: Log = new Log(logEnum.ERROR , T);
        LOG.insert(record);
    },
    loading : (T: any) => console.log(`[-] ${T}`)
};