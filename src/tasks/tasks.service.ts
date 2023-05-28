import { Injectable, NotFoundException } from '@nestjs/common';
import { Takstatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  getAllTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getAllTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) throw new NotFoundException();
    return task;
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: string, status: Takstatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    this.taskRepository.save(task);
    return task;
  }
  async deleteTask(id: string): Promise<void> {
    const deleteOne = await this.taskRepository.delete(id);
    if (deleteOne.affected === 0) throw new NotFoundException();
  }
}
