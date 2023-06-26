import { Project } from '../entities/project.entity';

export interface CreateProjectForUserServiceInterface {
  createProjectForUser(description: string, githubUrl?: string, comment?: string): Promise<Project>;
}