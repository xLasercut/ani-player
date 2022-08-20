import { IPC } from '../shared/interfaces';

declare global {
  interface Window {
    ipcRenderer: IPC;
  }
}

const ipc = window.ipcRenderer;

export { ipc };
