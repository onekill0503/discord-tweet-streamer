import { config } from 'dotenv'
config();
import { Collection } from "discord.js";
import CMD from '../enum/command'

// import all executes
import ping from './executes/ping'
import removeFilter from './executes/removeFilter';
import addFilter from './executes/addFilter';

const collection: any = new Collection();

collection.set(CMD.PING , ping);
collection.set(CMD.REMOVE_FILTER , removeFilter);
collection.set(CMD.ADD_FILTER , addFilter);

export default collection;