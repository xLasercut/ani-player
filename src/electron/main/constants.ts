const IS_DEV = process.env.npm_lifecycle_event === 'app:dev';
const APP_EVENTS = {
    WINDOW_CREATED: 'WINDOW_CREATED'
};

export { IS_DEV, APP_EVENTS };
