import DB from '../database';
import { ICollection } from 'monk'
import Log from '../models/logs'

const LOG: ICollection = DB.get('logs');

export default {
    info    : (T: any) => console.log(`[i] ${T}`),
    success : (T: any) => {
        console.log(`[#] ${T}`)
        const record: Log = new Log();
        record.setType(`success`)
        record.setMessage(T);
        LOG.insert(record);
    },
    error   : (T: any) => {
        console.error(`[x] ${T}`)
        const record: Log = new Log();
        record.setType(`error`)
        record.setMessage(T);
        LOG.insert(record);
    },
    loading : (T: any) => console.log(`[-] ${T}`)
};