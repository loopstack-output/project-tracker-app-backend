import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { SearchProjectsForUserService } from '../services/search-projects-for-user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Project } from '../entities/project.entity';

@Controller('api/user/projects')
export class SearchProjectsForUserController {
  constructor(private readonly searchProjectsForUserService: SearchProjectsForUserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async searchProjectsForUser(
    @Query('search') search_string: string,
    @Request() req,
  ): Promise<Project[]> {
    if (!search_string) {
      throw new Error('Search string is required');
    }
    const projects = await this.searchProjectsForUserService.searchProjectsForUser(req.user.id, search_string);
    return projects;
  }
}