import {v4 as uuid} from 'uuid';

export default class Base {
    
    private id?: string = uuid();
    private created_at?: string = new Date().toString();
    private updated_at?: string = new Date().toString() ;

    // setter
    public setId(arg: string): void{
        this.id = arg;
    }
    public setCreatedAt(arg: string): void{
        this.created_at = arg;
    }
    public setUpdatedAt(arg: string): void{
        this.updated_at = arg;
    }

    // getter
    public getId(): string | undefined {
        return this.id;
    }
    public getCreatedAt(): string | undefined {
        return this.created_at;
    }
    public getUpdatedAt(): string | undefined {
        return this.updated_at;
    }
}