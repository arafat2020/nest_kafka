import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'admin-producer', 
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'admin-consumer-group', 
      },
    },
  })
  private clientKafka!: ClientKafka;

  async onModuleInit() {
    await this.clientKafka.connect();
  }

  sendEventToClient(message: any) {
    console.log('🚀 AdminService sending event to client:', message);
    this.clientKafka.emit('admin_to_client', message);
  }

  processClientEvent(data: any) {
    console.log('📥 Admin processing client event:', data);
  }

  replyToClientRequest(data: any) {
    console.log('📨 Admin received request, replying:', data);
    return { reply: `Hello Client, I got your data: ${JSON.stringify(data)}` };
  }
}
