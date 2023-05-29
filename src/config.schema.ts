import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  db_host: Joi.string().required(),
  db_port: Joi.number().default(5432).required(),
  db_username: Joi.string().required(),
  db_password: Joi.string().required(),
  db_database: Joi.string().required(),
  jwt_secret: Joi.string().required(),
});
