import axios from 'axios'
import { config } from 'dotenv'
import { ICollection } from 'monk';
config();
import DB from '../database'
import Filter from '../models/filters';
import Log from '../utils/logger';

async function seed(): Promise<void> {
    // get enviroment variabel
    const filters: ICollection = DB.get('filters');
    const { FILTER_URL , TWITTER_TOKEN } : any = process.env;

    // get current filter from twitter server
    Log.info(`Requesting filter data to twitter ...`)
    let filtersData: any;
    try {
        filtersData = await axios.get(FILTER_URL , {
            headers: {
                "Authorization":`Bearer ${TWITTER_TOKEN}`
            }
        });
    }catch(err: any){
        Log.error(err.message);
        process.exit();;
    }
    if(filtersData.data.data?.length > 1){
        Log.info(`Received ${filtersData.data.data.length} filter data from twitter`);
        const currentData: any = await filters.find({});
        const filterIdList: Array<string> = [ ...currentData?.map((v: any) => {
            return v.filter_id;
        })];
        const records: Array<Filter> = [];
        filtersData.data.data.map((v : any) => {
            if(filterIdList.indexOf(v.id) < 0 ){
                const record: Filter = new Filter();
                record.setFilter_Id(v.id);
                record.setValue(v.value);
                records.push(record);
            }
        })
        if(records.length > 0){
            Log.info(`Inserting filter data to database`);
            await filters.insert(records);
            Log.info(`Successfully Insert filter data.`);
        }
        Log.info(`No new filters data.`);
        process.exit();
    } else {
        Log.info(`No filter data from twitter.`);
        process.exit();
    }
}

seed();