import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Takstatus } from '../task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(Takstatus)
  status?: Takstatus;

  @IsOptional()
  @IsString()
  search?: string;
}
