import { Controller, Put, UseGuards, Request, Param, Body } from '@nestjs/common';
import { UpdateProjectByIdForUserService } from '../services/update-project-by-id-for-user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Project } from '../entities/project.entity';

@Controller('api/user/projects')
export class UpdateProjectByIdForUserController {
  constructor(private readonly updateProjectByIdForUserService: UpdateProjectByIdForUserService) {}

  @Put(':project_id')
  @UseGuards(JwtAuthGuard)
  async updateProjectByIdForUser(
    @Param('project_id') projectId: string,
    @Request() req,
    @Body('description') description?: string,
    @Body('github_url') githubUrl?: string,
    @Body('status') status?: string,
    @Body('comment') comment?: string,
  ): Promise<Project> {
    const project = await this.updateProjectByIdForUserService.updateProjectByIdForUser(
      projectId,
      req.user.id,
      description,
      githubUrl,
      status,
      comment,
    );
    return project;
  }
}