// src/electron/preload/preload.ts
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer, contextBridge } from 'electron';
import { IPC } from '../shared/interfaces';

const ipc: IPC = {
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel: string, f: Function) => {
    ipcRenderer.on(channel, (event, ...args) => {
      f(...args);
    });
  }
};

contextBridge.exposeInMainWorld('ipcRenderer', ipc);

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
