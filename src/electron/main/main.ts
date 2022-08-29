import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import { AniPlayerWindows } from './windows';
import { EventEmitter } from 'node:events';
import { APP_EVENTS } from './constants';

class MainApp {
  protected _windows: AniPlayerWindows;
  public onEvent: EventEmitter = new EventEmitter();

  constructor(windows: AniPlayerWindows) {
    this._windows = windows;
    Menu.setApplicationMenu(this._generateMenu());

    app.on('ready', () => {
      this._windows.createAll();
      this.onEvent.emit(APP_EVENTS.WINDOW_CREATED);
    });

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        this._windows.createAll();
      }
    });

    app.on('window-all-closed', () => {
      this._onWindowAllClosed();
    });
  }

  protected _onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  protected _generateMenu(): Menu {
    const template: MenuItemConstructorOptions[] = [
      {
        label: 'Window',
        submenu: [
          {
            label: 'Anime',
            click: () => {
              this._windows.createAnime();
            }
          }
        ]
      }
    ];

    return Menu.buildFromTemplate(template);
  }
}

export { MainApp };
