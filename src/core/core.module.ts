import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Project]),
  ],
})
export class CoreModule {}