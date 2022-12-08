import {v4 as uuid} from 'uuid';

export default class Base {
    
    private id: string = uuid();
    private created_at: string = new Date().toString();
    private updated_at: string = new Date().toString() ;

    set _id(arg: string){
        this.id = arg;
    }
    set _created_at(arg: string){
        this.created_at = arg;
    }
    set _updated_at(arg: string){
        this.updated_at = arg;
    }

    get _id(): string {
        return this.id;
    }
    get _created_at(): string {
        return this.created_at;
    }
    get _updated_at(): string {
        return this.updated_at;
    }
}