import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postsModel: typeof Post,
    private filesService: FilesService,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postsModel.findAll({ include: { all: true } });
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const posts = await this.postsModel.findByPk(id, {
      include: { all: true },
    });
    return posts;
  }

  async createPost(
    dto: CreatePostDto,
    image: Express.Multer.File,
  ): Promise<Post> {
    const filename = this.filesService.createFile(image);
    const post = await this.postsModel.create(
      { ...dto, image: filename },
      { include: { all: true } },
    );
    return post;
  }

  async updatePost(
    id: number,
    dto: CreatePostDto,
    image: Express.Multer.File,
  ): Promise<Post> {
    const filename = this.filesService.createFile(image);
    const post = await this.postsModel.findByPk(id, { include: { all: true } });
    await post.update({ ...dto, image: filename });
    return post;
  }

  async deletePost(id: number): Promise<Post> {
    const post = await this.postsModel.findByPk(id, { include: { all: true } });
    await post.destroy();
    return post;
  }
}
