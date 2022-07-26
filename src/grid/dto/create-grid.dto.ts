import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateGridDto {
  @ApiProperty({ description: 'Size of the grid', example: 3 })
  @IsNotEmpty()
  @IsPositive()
  readonly size: number;

  @ApiProperty({
    description: 'Values of the grid (as a string separated by commas)',
    example: '4, 2, 3, 2, 2, 1, 3, 2, 1',
  })
  @IsNotEmpty()
  @IsString()
  readonly values: string;

  grid: Record<string, any>;
}
