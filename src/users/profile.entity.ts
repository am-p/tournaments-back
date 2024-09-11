import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({nullable: true})
  age: number;
}
