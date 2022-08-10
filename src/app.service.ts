import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigurationService } from './config/configuration.service';

// Dummy values
const phoneNumber = '+919999988888';
const password = '+919999988888-PWD#';

@Injectable()
export class AppService {
  private cognitoidentityserviceprovider: AWS.CognitoIdentityServiceProvider;
  constructor(private readonly configService: ConfigurationService) {
    AWS.config.update({ region: this.configService.awsRegion });
    this.cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider({
        apiVersion: 'latest',
      });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createCognitoUser() {
    const cognitoParams = {
      UserPoolId: this.configService.awsCognitoUserPoolId,
      Username: phoneNumber,
      MessageAction: 'SUPPRESS',
      UserAttributes: [
        {
          Name: 'phone_number',
          Value: phoneNumber,
        },
        {
          Name: 'phone_number_verified',
          Value: 'true',
        },
      ],
      ForceAliasCreation: false,
    };
    try {
      const response = await this.cognitoidentityserviceprovider
        .adminCreateUser(cognitoParams)
        .promise();
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    return 'done';
  }

  async getUser() {
    const cognitoParams = {
      Username: phoneNumber,
      UserPoolId: this.configService.awsCognitoUserPoolId,
    };
    try {
      const response = await this.cognitoidentityserviceprovider
        .adminGetUser(cognitoParams)
        .promise();
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    return 'done';
  }

  async setPassword() {
    const setPasswordParams: AWS.CognitoIdentityServiceProvider.AdminSetUserPasswordRequest =
      {
        Username: phoneNumber,
        UserPoolId: this.configService.awsCognitoUserPoolId,
        Password: password,
        Permanent: true,
      };
    try {
      const response = await this.cognitoidentityserviceprovider
        .adminSetUserPassword(setPasswordParams)
        .promise();
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    return 'done';
  }

  async signIn() {
    const signinParams: AWS.CognitoIdentityServiceProvider.AdminInitiateAuthRequest =
      {
        ClientId: this.configService.awsCognitoPoolClientId,
        AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: phoneNumber,
          PASSWORD: password,
        },
        UserPoolId: this.configService.awsCognitoUserPoolId,
      };
    try {
      const response = await this.cognitoidentityserviceprovider
        .adminInitiateAuth(signinParams)
        .promise();
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    return 'done';
  }

  async getUserUsingToken() {
    const getUserParams: AWS.CognitoIdentityServiceProvider.GetUserRequest = {
      AccessToken: '',
    };
    try {
      const response = await this.cognitoidentityserviceprovider
        .getUser(getUserParams)
        .promise();
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    return 'done';
  }

  async refreshToken() {
    const refreshTokenParams: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest =
      {
        ClientId: this.configService.awsCognitoPoolClientId,
        AuthFlow: 'REFRESH_TOKEN',
        AuthParameters: { REFRESH_TOKEN: '' },
      };
    try {
      const response = await this.cognitoidentityserviceprovider
        .initiateAuth(refreshTokenParams)
        .promise();
      console.log(JSON.stringify(response, null, 2));
    } catch (err) {
      console.error(err);
    }
    return 'done';
  }
}
