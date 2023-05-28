import { IsEnum } from 'class-validator';
import { Takstatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(Takstatus)
  status: Takstatus;
}
