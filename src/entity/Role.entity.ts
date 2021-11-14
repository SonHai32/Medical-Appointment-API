import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({ type: "nvarchar", length: 32, default: "User" })
  name!: string;

  @Column({
    type: "nvarchar",
    length: 100,
    nullable: true,
  })
  description!: string;
}
