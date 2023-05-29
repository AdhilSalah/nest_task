import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Takstatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  constructor(private datasource: DataSource) {
    super(Task, datasource.createEntityManager());
  }
  async getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) query.andWhere('task.status = :status', { status });
    if (search)
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search)  OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    try {
      const task = await query.getMany();
      return task;
    } catch (error) {
      this.logger.error(`failed to get task for ${user.username}`);
      throw new InternalServerErrorException();
    }
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      description,
      title,
      status: Takstatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
