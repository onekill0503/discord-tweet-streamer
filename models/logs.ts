import base from './base'

class Log extends base {
    private _type: string;
    private _message: string;

    constructor(type: string = "" , message: string = ""){
        super()
        this._type = type;
        this._message = message;
    }

    set type(arg: string){
        this._type = arg;
        this.updated_at = new Date().toString()
    }
    set message(arg: string){
        this._message = arg;
        this.updated_at = new Date().toString()
    }

    get type(): string {
        return this._type;
    }
    get message(): string {
        return this._message;
    }
}

export default Log;