import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../core/entities/user.entity';

/**
 * Stores project information such as name, description, githubUrl, status, comment, and createdBy
 */
@Entity()
export class Project {
  /**
   * The unique identifier for the project
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The description of the project. This field is required.
   */
  @Column({ nullable: false })
  description: string;

  /**
   * The URL of the project's GitHub repository. This field is optional.
   */
  @Column({ nullable: true })
  githubUrl?: string;

  /**
   * The status of the project. Valid values are: pending, processing, failure, and done.
   * Default: pending
   */
  @Column({ default: 'pending' })
  status: string;

  /**
   * An optional comment about the project.
   */
  @Column({ nullable: true })
  comment?: string;

  /**
   * A reference to the user that created the project. This is a many-to-one relationship. A project can only be created by one user. A user can create many projects.
   */
  @ManyToOne(() => User, user => user.projects)
  createdBy: User;
}