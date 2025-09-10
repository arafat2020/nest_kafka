// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   getData(): { message: string } {
//     return { message: 'Hello API' };
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'client-producer',
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'client-producer-consumer',
      },
    },
  })
  private kafkaClient!: ClientKafka;

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('user_created');
    await this.kafkaClient.connect();
  }

  async createUser(user: any) {
    console.log('🚀 Client sending user_created event:', user);
    return this.kafkaClient.emit('user_created', user);
  }
}





