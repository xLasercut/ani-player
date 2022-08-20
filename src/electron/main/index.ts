import { MainApp } from './main';
import { aniPlayerWindows } from './windows';
import { APP_EVENTS } from './constants';
import { IpcHandler } from './ipc';
import { ipcMain } from 'electron';

const mainApp = new MainApp(aniPlayerWindows);
const ipcHandler = new IpcHandler(aniPlayerWindows, ipcMain);

mainApp.onEvent.on(APP_EVENTS.WINDOW_CREATED, () => {
  ipcHandler.init();
});
