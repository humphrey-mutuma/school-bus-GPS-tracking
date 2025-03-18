import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class PaginatedResult<T> {
  @ApiProperty({ description: 'Total records' })
  @IsNumber()
  @IsOptional()
  totalRecords: number; // Total number of records in the dataset

  @ApiProperty({ description: 'Response data' })
  @IsOptional()
  items: T; // Paginated items (e.g., a list of items)
}
