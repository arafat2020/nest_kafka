import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Post()
  async createUser(@Body() user: any) {
    await this.appService.createUser(user);
    return { status: 'sent', user };
  }

  @MessagePattern('user_created')
  handleUserCreated(@Payload() message: any) {
    console.log('📩 Admin received user_created event:', message.value);
    return { received: message.value };
  }


}
