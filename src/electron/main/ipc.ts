import { AniPlayerWindows } from './windows';
import { IpcMain } from 'electron';
import { IPC_EVENTS } from '../shared/constants';
import { AnimeEpisodeDetailsSource } from '../../assets/interfaces';

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

    this._ipcMain.on(IPC_EVENTS.PLAY_VIDEO, (_event, videoUrl: string) => {
      this._windows.main.webContents.send(IPC_EVENTS.PLAY_VIDEO, videoUrl)
    })
  }
}

export { IpcHandler };
