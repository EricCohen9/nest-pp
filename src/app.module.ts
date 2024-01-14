import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './usersMongodb/module/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserGModule } from './usersPostgres/users.module';

@Module({
  imports: [
    UsersModule,
    UserGModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    // WebSocketModule
  ],
})
export class AppModule { }
