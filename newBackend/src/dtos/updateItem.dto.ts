import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  public title: string;

  @IsNumber()
  @IsOptional()
  public price: number;

  @IsString()
  @IsOptional()
  public description: string;

  @IsArray()
  @IsOptional()
  public categoriesId?: number[];
}
