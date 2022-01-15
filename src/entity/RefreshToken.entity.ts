import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn({type: 'int'})
  id!: string;

  @Column({ type: "varchar", unique: true })
  token!: string;
}
