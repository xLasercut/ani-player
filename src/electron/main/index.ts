import { MainApp } from './main';
import { AniPlayerWindows } from './windows';
import { APP_EVENTS } from './constants';
import { IpcHandler } from './ipc';
import { app, ipcMain } from 'electron';
import { AniPlayerConfig } from './config';

const config = new AniPlayerConfig(app);
const aniPlayerWindows = new AniPlayerWindows(config);
const mainApp = new MainApp(app, aniPlayerWindows, config);
const ipcHandler = new IpcHandler(aniPlayerWindows, ipcMain);

mainApp.onEvent.on(APP_EVENTS.WINDOW_CREATED, () => {
  ipcHandler.init();
});
