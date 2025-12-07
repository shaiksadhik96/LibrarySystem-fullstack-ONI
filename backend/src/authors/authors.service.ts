import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const { name, bio } = createAuthorDto;

    return this.prisma.author.create({
      data: {
        name,
        bio,
      },
    });
  }

  async findAll() {
    return this.prisma.author.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    // Ensure author exists
    await this.findOne(id);

    return this.prisma.author.update({
      where: { id },
      data: updateAuthorDto,
    });
  }

  async remove(id: number) {
    // Ensure author exists
    await this.findOne(id);

    await this.prisma.author.delete({
      where: { id },
    });

    return { message: 'Author deleted successfully' };
  }
}
