import base from './base'
import ILog from './interfaces/logs'

class Log extends base implements ILog {
    type?: string;
    message?: string;

    public setType(arg: string): void {
        this.type = arg;
        this.setUpdatedAt(new Date().getTime().toString());
    }
    public setMessage(arg: string): void {
        this.message = arg;
        this.setUpdatedAt(new Date().getTime().toString());
    }
    public getType() : string | undefined {
        return this.type; 
    }
    public getMessage() : string | undefined {
        return this.message; 
    }
}

export default Log;