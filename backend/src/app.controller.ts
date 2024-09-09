import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  login(): string {
    return this.appService.getHello();
  }

  @Post()
  register(@Body() body): string {
    return this.appService.createNewUser(body);
  }

  //login
  //register
}
