import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @Post('send-event')
  sendEvent(@Body() body: { message: any }) {
    this.appService.sendEventToClient(body.message);
    return { status: 'event_sent', message: body.message };
  }

  // Client → Admin (event)
  @EventPattern('client_to_admin')
  handleClientEvent(@Payload() message: any) {
    console.log('📩 Admin received client event:', message);
    this.appService.processClientEvent(message.value);
  }

  // Client → Admin (request)
  @MessagePattern('admin_to_client')
  handleClientRequest(@Payload() message: any) {
    console.log('📩 Admin received client request:', message);
    return this.appService.replyToClientRequest(message.value);
  }
}
