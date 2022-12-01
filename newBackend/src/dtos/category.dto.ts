import {IsString} from 'class-validator';

export class categoryDto {
  @IsString
  title: string
}
