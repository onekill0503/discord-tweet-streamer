import base from './base'
class Filter extends base {

    private _filter_id: string;
    private _value: string;

    constructor(filter_id: string = "", value: string = ""){
        super();
        this._filter_id = filter_id;
        this._value = value;
    }

    set filter_id(arg: string) {
        this._filter_id = arg;
        this.updated_at = new Date().toString()
    }
    set value(arg: string) {
        this._value = arg;
        this.updated_at = new Date().toString()
    }
    get filter_id(): string {
        return this._filter_id;
    }
    get value(): string {
        return this._value;
    }
}

export default Filter;