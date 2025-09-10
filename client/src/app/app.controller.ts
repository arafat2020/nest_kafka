import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() user: any) {
    await this.appService.createUser(user);
    return { status: 'sent', user };
  }
}
