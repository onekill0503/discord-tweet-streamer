interface ILog {
    type?: string;
    message?: string;
    setType: (arg: string) => void;
    setMessage: (arg: string) => void;
    getType: () => string | undefined;
    getMessage: () => string | undefined;
}
export default ILog;