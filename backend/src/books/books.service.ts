import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const { title, description, publishedYear, authorId } = createBookDto;

    // Ensure author exists
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return this.prisma.book.create({
      data: {
        title,
        description,
        publishedYear,
        authorId,
      },
      include: { author: true },
    });
  }

  async findAll(filter: any) {
    const { authorId, isBorrowed } = filter;

    return this.prisma.book.findMany({
      where: {
        authorId: authorId ? Number(authorId) : undefined,
        isBorrowed: isBorrowed !== undefined ? isBorrowed === 'true' : undefined,
      },
      include: { author: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) throw new NotFoundException('Book not found');

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    // Ensure book exists
    await this.findOne(id);

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
      include: { author: true },
    });
  }

  async remove(id: number) {
    // Ensure book exists
    await this.findOne(id);

    await this.prisma.book.delete({
      where: { id },
    });

    return { message: 'Book deleted successfully' };
  }
}
