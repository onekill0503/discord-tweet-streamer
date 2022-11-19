import base from './base'
import IFilter from './interfaces/filters'
class Filter extends base implements IFilter {

    filter_id: string | undefined;
    value: string | undefined;

    public setFilter_Id(arg: string): void {
        this.filter_id = arg;
        this.setUpdatedAt(new Date().toString());
    }
    public setValue(arg: string): void {
        this.value = arg;
        this.setUpdatedAt(new Date().toString());
    }

    public getFilter_Id(): string | undefined {
        return this.filter_id;
    }
    public getValue(): string | undefined {
        return this.value;
    }
}

export default Filter;