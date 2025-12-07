export class CreateBookDto {
  title: string;
  description?: string;
  publishedYear?: number;
  authorId: number; // required
}
