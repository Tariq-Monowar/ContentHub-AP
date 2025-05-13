import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    return this.databaseService.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const post = await this.databaseService.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async findUserPosts(userId: number) {
    return this.databaseService.post.findMany({
      where: { authorId: userId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, updatePostDto: CreatePostDto, userId: number) {
    const post = await this.databaseService.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    return this.databaseService.post.update({
      where: { id },
      data: updatePostDto,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number) {
    const post = await this.databaseService.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    return this.databaseService.post.delete({
      where: { id },
    });
  }
}