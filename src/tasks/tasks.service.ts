import { Injectable, NotFoundException } from '@nestjs/common';
import { Takstatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  getAllTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getAllTasks(filterDto, user);
  }

  async getTaskById(id: string, user?: User): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id, user });
    if (!task) throw new NotFoundException();
    return task;
  }
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    status: Takstatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    this.taskRepository.save(task);
    return task;
  }
  async deleteTask(id: string, user: User): Promise<void> {
    const deleteOne = await this.taskRepository.delete({ id, user });
    if (deleteOne.affected === 0) throw new NotFoundException();
  }
}
