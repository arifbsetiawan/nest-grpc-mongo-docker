import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config: ConfigService = app.get(ConfigService);

  const protoDir = join(__dirname, '..', 'protos');
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: config.get('GRPC_URI'),
      package: 'book',
      protoPath: 'book.proto',
      loader: {
        keepCase: true,
        longs: Number,
        defaults: false,
        arrays: true,
        objects: true,
        includeDirs: [protoDir],
      }
    }
  });
  
  await app.startAllMicroservicesAsync();
  await app.listen(config.get('APP_PORT'));
}

bootstrap();
