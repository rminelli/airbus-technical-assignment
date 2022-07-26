import { Score } from '../../scores/entities/score.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Grid')
export class Grid {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  size: number;

  @Column()
  values: string;

  @Column({ type: 'jsonb', nullable: false })
  grid: Record<string, any>;

  @OneToMany(() => Score, (score) => score.grid)
  score: Score[];
}
