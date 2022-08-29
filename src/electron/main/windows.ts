import { BrowserWindow } from 'electron';
import { join } from 'path';
import { IS_DEV } from './constants';
import { getUrl } from './helpers';

class AniPlayerWindows {
  public main!: BrowserWindow;
  public anime!: BrowserWindow;

  public createMain(): void {
    this.main = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        preload: join(__dirname, '../preload/preload.js')
      },
      autoHideMenuBar: true
    });

    this.main.loadURL(getUrl('/main-player'));

    this.main.on('closed', () => {
      if (!this.anime.isDestroyed()) {
        this.anime.close();
      }
    });

    if (IS_DEV) {
      this.main.webContents.openDevTools();
    }
  }

  public createAnime(): void {
    if (this.anime && !this.anime.isDestroyed()) {
      this.anime.show();
      return;
    }

    this.anime = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        preload: join(__dirname, '../preload/preload.js')
      }
    });

    this.anime.removeMenu();
    this.anime.loadURL(getUrl('/anime-select'));
    this.anime.show();

    if (IS_DEV) {
      this.anime.webContents.openDevTools();
    }
  }

  public createAll(): void {
    this.createMain();
    this.createAnime();
  }
}

const aniPlayerWindows = new AniPlayerWindows();

export { AniPlayerWindows, aniPlayerWindows };
