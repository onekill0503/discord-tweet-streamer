// load
import monk from 'monk';
import {config} from 'dotenv';

config();
const { MONGODB_URI , DB_NAME } : any = process.env

// export
export default monk(MONGODB_URI + DB_NAME + `?authSource=admin&readPreference=primary&appname=dc_tweet_streamer&directConnection=true&ssl=false`);