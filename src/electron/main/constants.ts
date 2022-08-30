import { AppConfig } from '../interfaces';

const IS_DEV = process.env.npm_lifecycle_event === 'app:dev';
const APP_EVENTS = {
    WINDOW_CREATED: 'WINDOW_CREATED'
};

const DEFAULT_CONFIG: AppConfig = {
    mainWindowSize: {
        height: 720,
        width: 1280
    },
    animeSelectWindowSize: {
        height: 720,
        width: 1280
    }
}

export { IS_DEV, APP_EVENTS, DEFAULT_CONFIG };
