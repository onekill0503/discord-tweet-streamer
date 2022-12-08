import base from './base'
class Filter extends base {

    private filter_id: string;
    private value: string;

    constructor(filter_id: string = "", value: string = ""){
        super();
        this.filter_id = filter_id;
        this.value = value;
    }

    set _filter_id(arg: string) {
        this.filter_id = arg;
        this._updated_at = new Date().toString()
    }
    set _value(arg: string) {
        this.value = arg;
        this._updated_at = new Date().toString()
    }
    get _filter_id(): string {
        return this.filter_id;
    }
    get _value(): string {
        return this.value;
    }
}

export default Filter;