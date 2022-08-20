import { IS_DEV } from './constants';
import { join } from 'path';

function getBaseUrl(): string {
  if (IS_DEV) {
    return 'http://localhost:3000/';
  }
  return `file://${join(__dirname, '..', '..', 'index.html')}`;
}

function getUrl(path: string = ''): string {
  if (path) {
    return `${getBaseUrl()}#${path}`;
  }
  return getBaseUrl();
}

export { getUrl };
