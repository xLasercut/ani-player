import { BrowserWindow } from 'electron';
import { join } from 'path';
import { IS_DEV } from './constants';
import { getUrl } from './helpers';

let mainWindow: BrowserWindow;

function openAnimeWindow(): void {
  const animeWindow = new BrowserWindow({
    width: 300,
    height: 720,
    parent: mainWindow
  });

  animeWindow.removeMenu();
  animeWindow.loadURL(getUrl('/anime-select'));
}

function openEpisodeWindow(): void {
  const episodeWindow = new BrowserWindow({
    width: 300,
    height: 720,
    parent: mainWindow
  });

  episodeWindow.removeMenu();
  episodeWindow.loadURL(getUrl('/episode-select'));
}

function openMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js')
    },
    autoHideMenuBar: true
  });

  mainWindow.loadURL(getUrl('/main-player'));

  if (IS_DEV) {
    mainWindow.webContents.openDevTools();
  }
}

export { openAnimeWindow, openMainWindow, openEpisodeWindow };
