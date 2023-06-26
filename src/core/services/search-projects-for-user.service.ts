import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';

@Injectable()
export class SearchProjectsForUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async searchProjectsForUser(userId: string, searchString: string): Promise<Project[]> {
    // Retrieve the User entity from the database using the provided userId
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Retrieve all Project entities associated with the User entity from the database that match the search criteria
    const projects = await this.projectRepository.find({
      where: {
        createdBy: user,
        description: Like(`%${searchString}%`),
      },
    });

    // Return the list of Project entities to the controller
    return projects;
  }
}