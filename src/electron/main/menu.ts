import { Menu, MenuItemConstructorOptions } from 'electron';
import { openAnimeWindow, openEpisodeWindow } from './windows';

const template: MenuItemConstructorOptions[] = [
  {
    label: 'Window',
    submenu: [
      {
        label: 'Anime',
        click: openAnimeWindow
      },
      {
        label: 'Episode',
        click: openEpisodeWindow
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);

export { menu };
