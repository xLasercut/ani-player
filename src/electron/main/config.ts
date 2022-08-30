import * as path from 'path';
import * as fs from 'fs';
import { AppConfig, AppConfigWindowSize } from '../shared/interfaces';
import { App } from 'electron';
import { DEFAULT_CONFIG, IS_DEV } from './constants';

class AniPlayerConfig {
  protected _app: App;
  protected _configFilepath: string;
  protected _config: AppConfig;

  constructor(app: App) {
    this._app = app;
    this._configFilepath = path.join(this._getConfigFileDir(), 'ani-player-settings.json');
    if (fs.existsSync(this._configFilepath)) {
      this._config = JSON.parse(fs.readFileSync(this._configFilepath, 'utf-8'));
    } else {
      this._config = Object.assign({}, DEFAULT_CONFIG);
    }
  }

  set mainWindowSize(size: AppConfigWindowSize) {
    this._config.mainWindowSize = size;
  }

  set animeSelectWindowSize(size: AppConfigWindowSize) {
    this._config.animeSelectWindowSize = size;
  }

  public saveConfig(): void {
    fs.writeFileSync(this._configFilepath, JSON.stringify(this._config, null, 2));
  }

  get mainWindowSize(): AppConfigWindowSize {
    return this._config.mainWindowSize;
  }

  get animeSelectWindowSize(): AppConfigWindowSize {
    return this._config.animeSelectWindowSize;
  }

  protected _getConfigFileDir(): string {
    if (IS_DEV) {
      return this._app.getAppPath();
    }
    return path.dirname(this._app.getPath('exe'));
  }
}

export { AniPlayerConfig };
