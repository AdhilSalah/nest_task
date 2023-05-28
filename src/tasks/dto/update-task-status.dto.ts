import { IsEnum } from 'class-validator';
import { Takstatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(Takstatus)
  status: Takstatus;
}
