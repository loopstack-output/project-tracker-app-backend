import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateProjectForUserService } from '../services/create-project-for-user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Project } from '../entities/project.entity';

@Controller('api/user/projects')
export class CreateProjectForUserController {
  constructor(private readonly createProjectForUserService: CreateProjectForUserService) {}

  /**
   * Creates a new project for the authenticated user with the provided description, github_url, status, and comment fields.
   * @param description The project description
   * @param githubUrl The project github url (optional)
   * @param comment The project comment (optional)
   * @param req The request object containing the authenticated userDTO object
   * @returns A Promise that resolves to the created Project entity
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async createProjectForUser(
    @Body('description') description: string,
    @Body('github_url') githubUrl?: string,
    @Body('comment') comment?: string,
    @Request() req,
  ): Promise<Project> {
    // Validate input
    if (!description) {
      throw new Error('Description is required');
    }

    // Call service method
    const project = await this.createProjectForUserService.createProjectForUser(description, githubUrl, comment, req.user.id);

    // Return the created entity
    return project;
  }
}