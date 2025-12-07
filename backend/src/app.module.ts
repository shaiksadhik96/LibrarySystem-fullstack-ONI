import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, AuthorsModule, BooksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
