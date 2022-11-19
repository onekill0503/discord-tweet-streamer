// load
import monk from 'monk';
import {config} from 'dotenv';

config();
const { MONGODB_URI , DB_NAME } : any = process.env

// export
export default monk(MONGODB_URI + DB_NAME);