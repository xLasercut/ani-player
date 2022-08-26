import { BrowserWindow } from 'electron';
import { join } from 'path';
import { IS_DEV } from './constants';
import { getUrl } from './helpers';

class AniPlayerWindows {
  public main!: BrowserWindow;
  public anime!: BrowserWindow;
  public episode!: BrowserWindow;

  public createEpisode(): void {
    if (this.episode && !this.episode.isDestroyed()) {
      this.episode.show();
      return;
    }

    const mainWindowPosition = this.main.getPosition();

    this.episode = new BrowserWindow({
      width: 700,
      height: 720,
      webPreferences: {
        preload: join(__dirname, '../preload/preload.js')
      },
      x: mainWindowPosition[0],
      y: mainWindowPosition[1]
    });

    this.episode.removeMenu();
    this.episode.loadURL(getUrl('/episode-select'));
    this.episode.show();

    if (IS_DEV) {
      this.episode.webContents.openDevTools();
    }
  }

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
    this.main.setAspectRatio(16 / 9);

    this.main.on('closed', () => {
      if (!this.episode.isDestroyed()) {
        this.episode.close();
      }

      if (!this.episode.isDestroyed()) {
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

    const mainWindowPosition = this.main.getPosition();

    this.anime = new BrowserWindow({
      width: 500,
      height: 720,
      webPreferences: {
        preload: join(__dirname, '../preload/preload.js')
      },
      x: mainWindowPosition[0] + 800,
      y: mainWindowPosition[1]
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
    this.createEpisode();
  }
}

const aniPlayerWindows = new AniPlayerWindows();

export { AniPlayerWindows, aniPlayerWindows };
