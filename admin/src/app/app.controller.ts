import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('user_created')
  handleUserCreated(@Payload() message: any) {
    console.log('📩 Admin received user_created event:', message.value);
    return { received: message.value };
  }
}
