import * as path from 'path';
import * as fs from 'fs';
import { App } from 'electron';
import { DEFAULT_CONFIG, IS_DEV } from './constants';
import { AppConfigType, AppConfigWindowSizeType } from '../schemas/types';
import { AppConfig } from '../schemas/config';

class AniPlayerConfig {
  protected _app: App;
  protected _configFilepath: string;
  protected _config: AppConfigType;

  constructor(app: App) {
    this._app = app;
    this._configFilepath = path.join(this._getConfigFileDir(), 'ani-player-settings.json');
    this._config = this._getConfig();
  }

  set mainWindowSize(size: AppConfigWindowSizeType) {
    this._config.mainWindowSize = size;
  }

  set animeSelectWindowSize(size: AppConfigWindowSizeType) {
    this._config.animeSelectWindowSize = size;
  }

  public saveConfig(): void {
    fs.writeFileSync(this._configFilepath, JSON.stringify(this._config, null, 2));
  }

  get mainWindowSize(): AppConfigWindowSizeType {
    return this._config.mainWindowSize;
  }

  get animeSelectWindowSize(): AppConfigWindowSizeType {
    return this._config.animeSelectWindowSize;
  }

  protected _getConfigFileDir(): string {
    if (IS_DEV) {
      return this._app.getAppPath();
    }
    return path.dirname(this._app.getPath('exe'));
  }

  protected _getConfig(): AppConfigType {
    if (!fs.existsSync(this._configFilepath)) {
      return Object.assign({}, DEFAULT_CONFIG);
    }

    try {
      const savedConfig = JSON.parse(fs.readFileSync(this._configFilepath, 'utf-8'));
      if (this._isValidConfig(savedConfig)) {
        return savedConfig;
      }
    } catch {
      return Object.assign({}, DEFAULT_CONFIG);
    }

    return Object.assign({}, DEFAULT_CONFIG);
  }

  protected _isValidConfig(config: any): boolean {
    try {
      AppConfig.parse(config);
      console.log("validated config")
      return true;
    } catch {
      return false;
    }
  }
}

export { AniPlayerConfig };
