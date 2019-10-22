import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsDefined()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsDefined()
  @ApiModelProperty()
  readonly password: string;
}
