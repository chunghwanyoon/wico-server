import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsOptional()
  public phone_number?: string;
  public _type?: number;
  public status?: number;
  public created_at?: Date;
  public updated_at?: Date;

  @IsString()
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public nickname: string;
  @ApiProperty()
  public password: string;

  @IsEmail()
  @ApiProperty()
  public email: string;
}
