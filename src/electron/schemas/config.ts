import Joi from 'joi';

const windowSizeConfigSchema = Joi.object({
  height: Joi.number().required(),
  width: Joi.number().required()
}).label('AppConfigWindowSize');

const aniPlayerConfigSchema = Joi.object({
  mainWindowSize: windowSizeConfigSchema.required(),
  animeSelectWindowSize: windowSizeConfigSchema.required()
}).label('AppConfig');

export { aniPlayerConfigSchema, windowSizeConfigSchema };
