import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserProfile } from './profile.entity';
import { UserPosts } from 'src/posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => UserPosts, userPosts => userPosts.author)
  userPosts: UserPosts[];
}
