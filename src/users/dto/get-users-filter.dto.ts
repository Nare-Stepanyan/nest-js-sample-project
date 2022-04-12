import { UserStatus } from '../user-status.enum';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
