
interface IFilter {
    filter_id: string  |undefined;
    value: string | undefined;
    setFilter_Id: (arg: string) => void;
    setValue: (arg: string) => void;
    getFilter_Id: () => string | undefined;
    getValue: () => string | undefined;
}

export default IFilter;