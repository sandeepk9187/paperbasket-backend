import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Passport } from 'passport';
// import { SamlStrategy } from 'passport-saml';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
