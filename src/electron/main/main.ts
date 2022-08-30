import { App, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { AniPlayerWindows } from './windows';
import { EventEmitter } from 'node:events';
import { APP_EVENTS } from './constants';
import { AniPlayerConfig } from './config';

class MainApp {
  protected _windows: AniPlayerWindows;
  public onEvent: EventEmitter = new EventEmitter();
  protected _config: AniPlayerConfig;
  protected _app: App;

  constructor(app: App, windows: AniPlayerWindows, config: AniPlayerConfig) {
    this._windows = windows;
    this._config = config;
    this._app = app;
    Menu.setApplicationMenu(this._generateMenu());

    this._app.on('ready', () => {
      this._windows.createAll();
      this.onEvent.emit(APP_EVENTS.WINDOW_CREATED);
    });

    this._app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        this._windows.createAll();
      }
    });

    this._app.on('window-all-closed', () => {
      this._onWindowAllClosed();
    });
  }

  protected _onWindowAllClosed(): void {
    this._config.saveConfig();
    if (process.platform !== 'darwin') {
      this._app.quit();
    }
  }

  protected _generateMenu(): Menu {
    const template: MenuItemConstructorOptions[] = [
      {
        label: 'Settings',
        submenu: [
          {
            label: 'Open anime select',
            click: () => {
              this._windows.createAnime();
            }
          },
          {
            label: 'Reset window size',
            click: () => {
              this._windows.resetSize();
            }
          }
        ]
      }
    ];

    return Menu.buildFromTemplate(template);
  }
}

export { MainApp };
