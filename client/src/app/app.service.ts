import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'client-service',
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'client-consumer', // must be unique
      },
    },
  })
  private kafkaClient!: ClientKafka;

  async onModuleInit() {
    // This is required to receive replies from Admin
    this.kafkaClient.subscribeToResponseOf('admin_to_client');
    await this.kafkaClient.connect();
  }

  // Client → Admin
  sendEventToAdmin(user: any) {
    return this.kafkaClient.emit('client_to_admin', user);
  }

  requestFromAdmin(payload: any): Observable<any> {
    return this.kafkaClient.send('admin_to_client', payload);
  }
}
