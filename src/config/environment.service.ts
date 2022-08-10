import { InternalServerErrorException } from '@nestjs/common';
import { dotEnvValidationKeys } from './configuration.schema';
import { ConfigurationService } from './configuration.service';

export const setEnvironmentVariables = async () => {
  const configService = new ConfigurationService();

  // SET BASIC ENVIRONMENT VARIABLES FROM .env
  configService.setEnvironmentVariablesFromDotEnv();

  // VALIDATE .env VARIABLES
  validateDotEnvVariables();
};

function validateDotEnvVariables() {
  const missingKeys = [];
  const envSchema = [...dotEnvValidationKeys];
  envSchema.forEach((key) => {
    const value = process.env[key];
    console.log(value);
    if (!value) {
      missingKeys.push(key);
    }
  });
  if (missingKeys.length) {
    throw new InternalServerErrorException(
      `config error - missing keys from .env file - ${missingKeys.join(',')}`,
    );
  }
}
