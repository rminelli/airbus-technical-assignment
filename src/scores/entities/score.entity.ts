import { Grid } from '../../grid/entities/grid.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('Score')
export class Score {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @ApiProperty()
  @Column()
  x: number;

  @ApiProperty()
  @Column()
  y: number;

  @ApiProperty()
  @Column()
  @Index()
  score: number;

  @ManyToOne(() => Grid, (grid) => grid.score, {
    onDelete: 'CASCADE',
  })
  grid: Grid;
}
