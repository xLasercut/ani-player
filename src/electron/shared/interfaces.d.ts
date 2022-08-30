interface IPC {
  on: { (channel: string, f: Function): void };
  send: { (channel: string, data: any): void };
}

interface AppConfigWindowSize {
  width: number;
  height: number;
}

interface AppConfig {
  mainWindowSize: AppConfigWindowSize;
  animeSelectWindowSize: AppConfigWindowSize;
}

export { IPC, AppConfig, AppConfigWindowSize };
