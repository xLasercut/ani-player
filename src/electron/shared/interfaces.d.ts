interface IPC {
    on: { (channel: string, f: Function): void };
    send: { (channel: string, data: any): void };
}

export { IPC };
