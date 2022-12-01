import {IsArray, IsNumber, IsString} from 'class-validator';

export class CreatedItemDto {
  @IsString()
  public title: string;

  @IsNumber()
  public price: number;

  @IsString()
  public description: string;

  @IsString()
  public image?: any;

  @IsArray()
  public categoriesId?: number[];
}
