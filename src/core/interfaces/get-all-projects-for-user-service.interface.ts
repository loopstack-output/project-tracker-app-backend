export interface GetAllProjectsForUserServiceInterface {
  getAllProjectsForUser(userId: string): Promise<Project[]>;
}