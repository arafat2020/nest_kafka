import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'client-producer',
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'admin-producer-consumer',
      },
    },
  })
  private kafkaClient!: ClientKafka;

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('send_message');
    await this.kafkaClient.connect();
  }

  async createUser(user: any) {
    console.log('🚀 Client sending user_created event:', user);
    return this.kafkaClient.emit('send_message', user);
  }


  
}
