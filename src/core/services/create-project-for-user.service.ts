import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { CreateProjectForUserServiceInterface } from '../interfaces/create-project-for-user-service.interface';

@Injectable()
export class CreateProjectForUserService implements CreateProjectForUserServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProjectForUser(description: string, githubUrl?: string, comment?: string): Promise<Project> {
    // Get the authenticated user id from the request object
    const userId = 'authenticatedUserId';

    // Find the authenticated user entity from the database
    const user = await this.userRepository.findOne({ where: { id: userId } });

    // Throw an error if the user entity is not found
    if (!user) {
      throw new Error('User not found');
    }

    // Create a new Project entity with the provided description, githubUrl, status (default: pending), and comment
    const project = new Project();
    project.description = description;
    project.githubUrl = githubUrl;
    project.comment = comment;
    project.status = 'pending';

    // Associate the Project entity with the authenticated User entity
    project.createdBy = user;

    // Save the new Project entity to the database
    const createdProject = await this.projectRepository.save(project);

    // Return the created Project entity
    return createdProject;
  }
}