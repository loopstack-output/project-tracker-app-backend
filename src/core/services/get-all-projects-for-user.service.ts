import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';

@Injectable()
export class GetAllProjectsForUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  /**
   * Retrieves all Project entities associated with the User entity from the database
   * @returns A Promise that resolves to a list of Project entities
   */
  async getAllProjectsForUser(userId: string): Promise<Project[]> {
    // Retrieve the User entity with the provided userId from the database
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Retrieve all Project entities associated with the User entity from the database
    const projects = await this.projectRepository.find({
      where: {
        createdBy: user,
      },
    });

    // Return the list of Project entities to the controller
    return projects;
  }
}