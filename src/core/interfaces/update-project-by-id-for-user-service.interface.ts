import { Project } from '../entities/project.entity';

export interface UpdateProjectByIdForUserServiceInterface {
  updateProjectByIdForUser(
    projectId: string,
    userId: string,
    description?: string,
    githubUrl?: string,
    status?: string,
    comment?: string,
  ): Promise<Project>;
}