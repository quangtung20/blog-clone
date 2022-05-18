import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { ShareModule } from './share/share.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
        }
      }
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `${configService.get('DB_URL')||'mongodb+srv://quangtung:123456789xx@cluster0.wmzvr.mongodb.net/blog-app?retryWrites=true&w=majority'}`,
          dbName: `${configService.get('MDB_NAME')||'blog-app'}`,
        }
      }
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/build'),
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    BlogModule,
    CommentModule,
    ShareModule,
    SubCategoryModule,
  ],
})
export class AppModule { }
