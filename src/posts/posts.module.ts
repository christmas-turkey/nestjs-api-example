import { AuthModule } from './../auth/auth.module';
import { FilesModule } from './../files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './posts.model';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [FilesModule, SequelizeModule.forFeature([Post]), AuthModule],
})
export class PostsModule {}
