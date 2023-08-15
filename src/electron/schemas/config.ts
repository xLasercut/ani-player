import { z } from 'zod';

const AppConfigWindowSize = z.object({
  height: z.number(),
  width: z.number()
});

const AppConfig = z.object({
  mainWindowSize: AppConfigWindowSize,
  animeSelectWindowSize: AppConfigWindowSize
});

export { AppConfigWindowSize, AppConfig };
