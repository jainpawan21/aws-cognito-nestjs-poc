import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigurationService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  setEnvironmentVariablesFromDotEnv() {
    dotenv.config({});
  }

  manuallySetEnvironmentVariables(environmentVariables: any) {
    Object.keys(environmentVariables).forEach((key) => {
      process.env[key] = environmentVariables[key];
    });
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env - ${key}`);
    }

    return value;
  }

  get mongoConnection() {
    return this.getValue('MONGO_CONNECTION_URL');
  }

  get appPort(): any {
    return this.getValue('PORT');
  }

  get appEnv(): string {
    return this.getValue('APP_ENV').toUpperCase();
  }

  get awsRegion() {
    return this.getValue('AWS_REGION');
  }

  get awsCognitoUserPoolId() {
    return this.getValue('AWS_USER_POOL_ID');
  }

  get awsCognitoPoolClientId() {
    return this.getValue('AWS_POOL_CLIENT_ID');
  }
}
