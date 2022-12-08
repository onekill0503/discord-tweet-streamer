import {v4 as uuid} from 'uuid';

export default class Base {
    
    private _dataId: string = uuid();
    private _created_at: string = new Date().toString();
    private _updated_at: string = new Date().toString() ;

    set id(arg: string){
        this._dataId = arg;
    }
    set created_at(arg: string){
        this._created_at = arg;
    }
    set updated_at(arg: string){
        this._updated_at = arg;
    }

    get id(): string {
        return this._dataId;
    }
    get created_at(): string {
        return this._created_at;
    }
    get updated_at(): string {
        return this._updated_at;
    }
}