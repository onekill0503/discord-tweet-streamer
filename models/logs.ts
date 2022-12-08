import base from './base'

class Log extends base {
    private type: string;
    private message: string;

    constructor(type: string = "" , message: string = ""){
        super()
        this.type = type;
        this.message = message;
    }

    set _type(arg: string){
        this.type = arg;
        this._updated_at = new Date().toString()
    }
    set _message(arg: string){
        this.message = arg;
        this._updated_at = new Date().toString()
    }

    get _type(): string {
        return this.type;
    }
    get _message(): string {
        return this.message;
    }
}

export default Log;