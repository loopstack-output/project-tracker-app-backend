import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { GetProjectsByStatusForUserService } from '../services/get-projects-by-status-for-user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Project } from '../entities/project.entity';

@Controller('api/user/projects')
export class GetProjectsByStatusForUserController {
  constructor(private readonly getProjectsByStatusForUserService: GetProjectsByStatusForUserService) {}

  /**
   * Returns a list of all projects created by the authenticated user filtered by the given status.
   * @param status The status to filter the projects by
   * @param req The request object containing the authenticated userDTO object
   * @returns A Promise that resolves to a list of Project entities
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getProjectsByStatusForUser(
    @Query('status') status: string,
    @Request() req,
  ): Promise<Project[]> {
    // Call service method
    const projects = await this.getProjectsByStatusForUserService.getProjectsByStatusForUser(req.user.id, status);

    // Return the list of Project entities to the frontend
    return projects;
  }
}