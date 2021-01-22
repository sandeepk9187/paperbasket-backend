import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controllers/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './controllers/auth/auth.module';
import { AddressModule } from './controllers/address/address.module';
import { VehiclesModule } from './controllers/vehicles/vehicles.module';
import { RidesModule } from './controllers/rides/rides.module';
import { TwilioModule } from 'nestjs-twilio';
import { StripeModule } from 'nestjs-stripe';
import { FacebookAuthModule } from 'facebook-auth-nestjs';

let ClientIdString = process.env.CLIENT_ID;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: +process.env.DATABASE_PORT,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FacebookAuthModule.forRoot({
      clientId: parseInt(ClientIdString),
      clientSecret: process.env.CLIENT_SECRET,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
