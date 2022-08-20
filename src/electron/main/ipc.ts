import { AniPlayerWindows } from './windows';
import { IpcMain } from 'electron';
import { IPC_EVENTS } from '../shared/constants';

class IpcHandler {
  protected _windows: AniPlayerWindows;
  protected _ipcMain: IpcMain;

  constructor(windows: AniPlayerWindows, ipcMain: IpcMain) {
    this._windows = windows;
    this._ipcMain = ipcMain;
  }

  public init(): void {
    this._ipcMain.on(IPC_EVENTS.GET_ANIME_DETAILS, (_event, animeId: string) => {
      this._windows.episode.webContents.send(IPC_EVENTS.GET_ANIME_DETAILS, animeId);
    });
  }
}

export { IpcHandler };
