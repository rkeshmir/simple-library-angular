import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../book.service';
import {Book} from '../book';
import {Shelf} from '../shelf';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {
  private books: Book[];
  private foundBooks: Book[];
  private shelf: Shelf;
  private Arr = Array;
  private round = Math.round;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.shelf = {
      title: this.route.snapshot.paramMap.get('title')
    };
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks(this.shelf)
      .subscribe(books => this.books = books);
  }

  addBook(book: Book) {
    this.bookService.addBook(this.shelf, book)
      .subscribe(books => this.books = books);
  }
  removeBook(book: Book) {
    this.bookService.removeBook(book)
      .subscribe(books => this.books = books);
  }
  searchBooks(query: string) {
    this.bookService.searchBooks(query)
      .subscribe(books => this.foundBooks = books);
  }

  getDate(book) {
    const months = ['Jan', 'Feb', 'Marc', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (!book.original_publication_day && !book.original_publication_month && !book.original_publication_year) {
      return null;
    }
    if (!book.original_publication_day && !book.original_publication_month) {
      return book.original_publication_year;
    }
    if (!book.original_publication_day) {
      return months[parseInt(book.original_publication_month, 10) - 1] + ', ' + book.original_publication_year;
    }
    return book.original_publication_day + ' '
      + months[parseInt(book.original_publication_month, 10) - 1]
      + ', ' + book.original_publication_year;
  }


}
