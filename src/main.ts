import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions'; 
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pubSub = new PubSub();

  app.useWebSocketAdapter(new IoAdapter(app));
  
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new BadRequestException(errors.map(err => Object.values(err.constraints)).flat());
      },
    })
  );

  await app.listen(3000);
}
bootstrap();