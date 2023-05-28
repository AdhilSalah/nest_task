import { Injectable, NotFoundException } from '@nestjs/common';
import { Takstatus, Task } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithfilter(filterDto: GetTaskFilterDto): Task[] {
    let task = this.getAllTasks();
    const { status, search } = filterDto;

    if (status) {
      task = task.filter((task) => task.status === status);
    }

    if (search) {
      task = task.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException();

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: Takstatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }
  updateTaskStatus(id: string, status: Takstatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
