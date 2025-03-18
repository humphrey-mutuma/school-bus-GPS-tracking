import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './db/db.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { StudentsModule } from './modules/students/students.module';
import { ParentsModule } from './modules/parents/parents.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UserModule,
    SharedModule,
    DriversModule,
    SchoolsModule,
    StudentsModule,
    ParentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
