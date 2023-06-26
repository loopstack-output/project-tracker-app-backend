export interface DeleteProjectByIdForUserServiceInterface {
  deleteProjectByIdForUser(projectId: string, userId: string): Promise<void>;
}