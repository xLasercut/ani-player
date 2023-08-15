import { z } from 'zod';
import { AppConfig, AppConfigWindowSize } from './config';

export type AppConfigWindowSizeType = z.infer<typeof AppConfigWindowSize>;
export type AppConfigType = z.infer<typeof AppConfig>;
