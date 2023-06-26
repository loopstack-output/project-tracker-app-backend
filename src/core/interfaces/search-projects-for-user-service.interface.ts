import { Project } from '../entities/project.entity';

export interface SearchProjectsForUserServiceInterface {
  searchProjectsForUser(userId: string, searchString: string): Promise<Project[]>;
}