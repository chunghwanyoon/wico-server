import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './groups/group.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [AuthModule, GroupModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
