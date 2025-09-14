import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Client → Admin (event)
  @Post('client-to-admin-event')
  async sendEvent(@Body() payload: any) {
    await this.appService.sendEventToAdmin(payload);
    return { status: 'event_sent', payload };
  }

  // Client → Admin (request)
  @Post('client-to-admin-request')
  async sendRequest(@Body() payload: any) {
    const res = await firstValueFrom(this.appService.requestFromAdmin(payload));
    return { status: 'request_sent', response: res };
  }

  // 👇 This receives requests from Admin
  @MessagePattern('admin_to_client')
  handleAdminRequest(@Payload() message: any) {
    console.log('📩 Client received request from Admin:', message);

    // You can reply back to Admin if needed
    return { reply: `Client got your message: ${JSON.stringify(message)}` };
  }
}
