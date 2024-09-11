import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UserProfile } from './users/profile.entity';
import { PostsModule } from './posts/posts.module';
import { UserPosts } from './posts/post.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'oreilly',
      database: 'test',
      entities: [User, UserProfile, UserPosts],
      synchronize: true,
  }),  UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
