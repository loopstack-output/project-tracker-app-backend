import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { DeleteProjectByIdForUserServiceInterface } from '../interfaces/delete-project-by-id-for-user-service.interface';

@Injectable()
export class DeleteProjectByIdForUserService implements DeleteProjectByIdForUserServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async deleteProjectByIdForUser(
    projectId: string,
    userId: string,
  ): Promise<void> {
    // Find the project by id
    const project = await this.projectRepository.findOne({ where: { id: projectId }, relations: ['createdBy'] });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    // Check if the user is the creator of the project
    if (project.createdBy.id !== userId) {
      throw new ForbiddenException('User is not authorized to delete this project');
    }
    // Delete the project from the database
    await this.projectRepository.delete(projectId);
  }
}