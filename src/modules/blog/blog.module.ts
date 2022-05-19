import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/database/entities/blog.entity';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    // MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    TypeOrmModule.forFeature([Blog]),
    AuthModule,
  ],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule { }
