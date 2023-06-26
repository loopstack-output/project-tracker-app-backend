import { Project } from '../entities/project.entity';

export interface GetProjectsByStatusForUserServiceInterface {
  getProjectsByStatusForUser(userId: string, status: string): Promise<Project[]>;
}