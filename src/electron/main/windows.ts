import { BrowserWindow } from 'electron';
import { join } from 'path';
import { DEFAULT_CONFIG, IS_DEV } from './constants';
import { getUrl } from './helpers';
import { AniPlayerConfig } from './config';

class AniPlayerWindows {
  public main!: BrowserWindow;
  public animeSelect!: BrowserWindow;
  protected _config: AniPlayerConfig;

  constructor(config: AniPlayerConfig) {
    this._config = config;
  }

  public createMain(): void {
    this.main = new BrowserWindow({
      ...this._config.mainWindowSize,
      webPreferences: {
        preload: join(__dirname, '..', 'preload', 'preload.js')
      },
      autoHideMenuBar: true
    });

    this.main.loadURL(getUrl('/main-player'));

    this.main.on('closed', () => {
      if (this._isAnimeWindowExists()) {
        this.animeSelect.close();
      }
    });

    this.main.on('resize', () => {
      const windowSize = this.main.getSize();
      this._config.mainWindowSize = {
        width: windowSize[0],
        height: windowSize[1]
      };
    });

    if (IS_DEV) {
      this.main.webContents.openDevTools();
    }
  }

  public createAnime(): void {
    if (this._isAnimeWindowExists()) {
      this.animeSelect.show();
      return;
    }

    this.animeSelect = new BrowserWindow({
      ...this._config.animeSelectWindowSize,
      webPreferences: {
        preload: join(__dirname, '..', 'preload', 'preload.js')
      }
    });

    this.animeSelect.removeMenu();
    this.animeSelect.loadURL(getUrl('/anime-select'));
    this.animeSelect.show();

    this.animeSelect.on('resize', () => {
      const windowSize = this.animeSelect.getSize();
      this._config.animeSelectWindowSize = {
        width: windowSize[0],
        height: windowSize[1]
      };
    });

    if (IS_DEV) {
      this.animeSelect.webContents.openDevTools();
    }
  }

  public createAll(): void {
    this.createMain();
    this.createAnime();
  }

  public resetSize(): void {
    this.main.setSize(DEFAULT_CONFIG.mainWindowSize.width, DEFAULT_CONFIG.mainWindowSize.height);
    if (this._isAnimeWindowExists()) {
      this.animeSelect.setSize(
        DEFAULT_CONFIG.animeSelectWindowSize.width,
        DEFAULT_CONFIG.animeSelectWindowSize.height
      );
    }
  }

  protected _isAnimeWindowExists(): boolean {
    return this.animeSelect && !this.animeSelect.isDestroyed();
  }
}

export { AniPlayerWindows };
