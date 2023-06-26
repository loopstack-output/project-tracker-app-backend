import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { GetProjectsByStatusForUserServiceInterface } from '../interfaces/get-projects-by-status-for-user-service.interface';

@Injectable()
export class GetProjectsByStatusForUserService implements GetProjectsByStatusForUserServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  /**
   * Retrieves all Project entities associated with the user and filtered by the provided status from the database
   * @returns A Promise that resolves to a list of Project entities
   */
  async getProjectsByStatusForUser(userId: string, status: string): Promise<Project[]> {
    // Retrieve the User entity with the provided userId from the database
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Retrieve all Project entities associated with the user and filtered by the provided status from the database
    const projects = await this.projectRepository.find({
      where: {
        createdBy: user,
        status,
      },
    });

    // Return the list of Project entities to the controller
    return projects;
  }
}