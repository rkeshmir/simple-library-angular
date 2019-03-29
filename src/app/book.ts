import {Shelf} from './shelf';

export class Book {
  id: number;
  title: string;
  shelf: Shelf;
  image_url: string;
  small_image_url: string;
  author: string;
  average_rating: number;
  original_publication_day: number;
  original_publication_month: number;
  original_publication_year: number;

  sameShelf(shelf: Shelf): boolean {
    return this.shelf.title === shelf.title;
  }
}
