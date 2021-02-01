import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/winteriscoming/v1/auth/auth.module';
import { GroupModule } from './api/winteriscoming/v1/groups/group.module';
import { UserModule } from './api/winteriscoming/v1/users/users.module';
import { PublicModule } from './api/winteriscoming/v1/public/public.module';
import { TaskModule } from './tasks/index.task';

@Module({
  imports: [
    /* FOR API */
    AuthModule,
    GroupModule,
    UserModule,
    PublicModule,

    /* FOR TASK: command scripts */
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
