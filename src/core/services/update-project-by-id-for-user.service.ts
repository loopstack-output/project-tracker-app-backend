import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';

@Injectable()
export class UpdateProjectByIdForUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  /**
   * Updates a project by id for a given user
   * @param projectId The id of the project to update
   * @param userId The id of the user who created the project
   * @param description The new description of the project (optional)
   * @param githubUrl The new github URL of the project (optional)
   * @param status The new status of the project (optional)
   * @param comment The new comment of the project (optional)
   * @returns A Promise that resolves to the updated Project entity
   */
  async updateProjectByIdForUser(
    projectId: string,
    userId: string,
    description?: string,
    githubUrl?: string,
    status?: string,
    comment?: string,
  ): Promise<Project> {
    // Find the project by id
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['createdBy'],
    });
    if (!project) {
      throw new Error('Project not found');
    }

    // Check if the user is the creator of the project
    if (project.createdBy.id !== userId) {
      throw new Error('User is not authorized to update this project');
    }

    // Update the project's description, github_url, status, or comment field
    if (description) {
      project.description = description;
    }
    if (githubUrl) {
      project.githubUrl = githubUrl;
    }
    if (status) {
      project.status = status;
    }
    if (comment) {
      project.comment = comment;
    }

    // Save the updated project to the database
    const updatedProject = await this.projectRepository.save(project);

    // Return the updated project
    return updatedProject;
  }
}