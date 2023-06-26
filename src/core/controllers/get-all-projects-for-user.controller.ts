import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GetAllProjectsForUserService } from '../services/get-all-projects-for-user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Project } from '../entities/project.entity';

@Controller('api/user')
export class GetAllProjectsForUserController {
  constructor(private readonly getAllProjectsForUserService: GetAllProjectsForUserService) {}

  @Get('projects')
  @UseGuards(JwtAuthGuard)
  async getAllProjectsForUser(@Request() req): Promise<Project[]> {
    return await this.getAllProjectsForUserService.getAllProjectsForUser(req.user.id);
  }
}