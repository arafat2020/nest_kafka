import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() user: any) {
    await this.appService.createUser(user);
    return { status: 'sent', user };
  }

  @EventPattern('send_message')
  handleUserCreated(@Payload() message: any) {
    console.log('📩 Admin received user_created event:', message.value);
    return { received: message.value };
  }
}
