import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Project } from '../../core/entities/project.entity';

/**
 * Stores user information such as name and projects created
 */
@Entity()
export class User {
  /**
   * The unique identifier for the user
   */
  @PrimaryColumn()
  id: string;

  /**
   * A reference to the projects created by the user
   * This is a one-to-many relationship. A user can create many projects. A project can only be created by one user.
   */
  @OneToMany(() => Project, project => project.createdBy)
  projects: Project[];
}