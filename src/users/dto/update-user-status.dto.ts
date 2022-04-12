import { UserStatus } from '../user-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateUserStatusDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
