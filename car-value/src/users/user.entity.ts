<<<<<<< HEAD
=======
import { Exclude } from 'class-transformer';
>>>>>>> 5accf3c4cdd00d9c3ab7f694f397a23d99a68f2f
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
<<<<<<< HEAD
=======
  @Exclude()
>>>>>>> 5accf3c4cdd00d9c3ab7f694f397a23d99a68f2f
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id: ', this.id);
  }

  @AfterRemove()
  logDelete() {
    console.log('Deleted User with id: ', this.id);
  }
}
