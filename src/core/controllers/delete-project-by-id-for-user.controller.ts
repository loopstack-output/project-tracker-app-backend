import { Controller, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { DeleteProjectByIdForUserService } from '../services/delete-project-by-id-for-user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/user/projects')
export class DeleteProjectByIdForUserController {
  constructor(private readonly deleteProjectByIdForUserService: DeleteProjectByIdForUserService) {}

  /**
   * Deletes the project for the authenticated user.
   * @param projectId The ID of the project to be deleted
   * @param req - The request object containing the authenticated userDTO object
   * @returns A Promise that resolves to the ID of the deleted Project entity
   */
  @Delete(':project_id')
  @UseGuards(JwtAuthGuard)
  async deleteProjectByIdForUser(
    @Param('project_id') projectId: string,
    @Request() req,
  ): Promise<string> {
    // Call service method
    await this.deleteProjectByIdForUserService.deleteProjectByIdForUser(projectId, req.user.id);

    // Return success message and the ID of the deleted entity
    return projectId;
  }
}