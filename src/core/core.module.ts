import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { CreateProjectForUserService } from './services/create-project-for-user.service';
import { GetAllProjectsForUserService } from './services/get-all-projects-for-user.service';
import { GetProjectsByStatusForUserService } from './services/get-projects-by-status-for-user.service';
import { SearchProjectsForUserService } from './services/search-projects-for-user.service';
import { UpdateProjectByIdForUserService } from './services/update-project-by-id-for-user.service';
import { DeleteProjectByIdForUserService } from './services/delete-project-by-id-for-user.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, Project]),
  ],
  providers: [
    CreateProjectForUserService,
    GetAllProjectsForUserService,
    GetProjectsByStatusForUserService,
    SearchProjectsForUserService,
    UpdateProjectByIdForUserService,
    DeleteProjectByIdForUserService,
  ],
})
export class CoreModule {}