import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/signup')
  createuser() {
    return this.appService.createCognitoUser();
  }

  @Get('/user')
  getUser() {
    return this.appService.getUser();
  }

  @Get('/setpass')
  setPassword() {
    return this.appService.setPassword();
  }

  @Get('/signin')
  signinUser() {
    return this.appService.signIn();
  }

  @Get('token')
  getUserViaToken() {
    return this.appService.getUserUsingToken();
  }

  @Get('refresh')
  refreshToken() {
    return this.appService.refreshToken();
  }
}
