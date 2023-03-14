import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import {MailerModule} from "@nestjs-modules/mailer"
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import * as path from 'path';
import { Comment } from './comments/comments.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      }
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      username: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Post, Comment],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    UsersModule,
    PostsModule,
    FilesModule,
    AuthModule,
    CommentsModule,
  ],
})
export class AppModule {}
