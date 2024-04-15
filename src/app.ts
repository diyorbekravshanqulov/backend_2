import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://bvpgviio:IMxyvDeQtN0tNrRU8jljYeQioASpb0FE@whale.rmq.cloudamqp.com/bvpgviio',
        ],
        queue: 'main_products_queue',
        queueOptions: {
          durable: false, 
        },
      },
    },
  );
  app.listen()
}
bootstrap();
