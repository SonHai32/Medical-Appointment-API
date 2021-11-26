import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "nvarchar", length: 32, default: "User" })
  name!: string;

  @Column({
    type: "nvarchar",
    length: 100,
    nullable: true,
  })
  description?: string;

  constructor(id: number, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
