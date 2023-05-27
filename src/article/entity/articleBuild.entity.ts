import { Article, User, UserToArticle } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleBuildEntity implements Omit<Article, 'authorId'> {
  @ApiProperty({ type: 'integer' })
  id: number;

  @ApiProperty({ type: 'string' })
  slug: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string' })
  description: string;

  @ApiProperty({ type: 'string' })
  body: string;

  @ApiProperty({ type: 'string', isArray: true })
  tagList: string[];

  @ApiProperty({ type: 'string' })
  createdAt: Date;

  @ApiProperty({ type: 'string' })
  updatedAt: Date;

  @ApiProperty({ type: 'number' })
  favoritesCount: number;

  @ApiProperty({ type: 'object', isArray: true })
  favoritedBy?: UserToArticle[];

  @ApiProperty({ type: 'object' })
  author?: User;
}