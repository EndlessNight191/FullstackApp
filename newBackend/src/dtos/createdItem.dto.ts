import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreatedItemDto {
  @IsString()
  public title: string;

  @IsNumber()
  public price: number;

  @IsString()
  public description: string;

  @IsArray()
  @IsOptional()
  public categoriesId?: number[];
}
