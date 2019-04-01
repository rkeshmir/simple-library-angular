import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as X2JS from 'x2js';

import {Book} from './book';
import {Observable, of, throwError } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {Shelf} from './shelf';

@Injectable({providedIn: 'root'})
export class BookService {
  private shelvesUrl = 'api/shelves';  // URL to web api
  private shelves: Shelf[];
  private books: Book[];
  constructor(private http: HttpClient) {
    this.shelves = [
      'fiction',
      'nonfiction',
      'young adult',
      'fantasy',
      'romance',
      'science',
      'history',
      'poetry'
    ].map(s => new Shelf(s));
    this.books = [];
  }

  addShelf(shelf: Shelf): Observable<Shelf[]> {
    for (let i = 0 ; i < this.shelves.length; i++) {
      if (shelf.title === this.shelves[i].title) {
        return throwError(shelf.title + ' already exists');
      }
    }
    this.shelves.push(shelf);
    return of(this.shelves);
  }
  removeShelf(shelf: Shelf) {
    if (this.books.filter(book => book.shelf.title === shelf.title).length > 0) {
      return throwError('Non-empty shelf can not be deleted');
    }
    this.shelves = this.shelves.filter(s => s.title !== shelf.title);
    return of(this.shelves);
  }

  getShelves(): Observable<Shelf[]> {
    return of(this.shelves);
  }

  getBooks(shelf: Shelf): Observable<Book[]> {
    return of(this.books.filter(book => book.sameShelf(shelf) ));
  }
  addBook(shelf: Shelf, book: Book) {
    console.log('addBook', this.books.filter(b => b.id === book.id).length);
    if (this.books.filter(b => b.id === book.id).length > 0) {
      console.log('error');
      return throwError(book.title + ' already exists');
    }
    book.shelf = shelf;
    this.books.push(book);
    return of(this.books);
  }
  removeBook(book: Book) {
    this.books = this.books.filter(b => b.id !== book.id);
    return of(this.books);
  }

  searchBooks(query: string): Observable<Book[]> {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://www.goodreads.com/search/index.xml?key=Mk0S6w7YPzHvy5sUDipOQ&q=' + query;
    // @ts-ignore
    return this.http.get<Book[]>(proxyUrl + targetUrl, {responseType: 'text'})
      .pipe(
        map(data => {
          console.log('pipe', typeof data);
          const x2js = new X2JS();
          console.log('fetched book', x2js.xml2js(data.toString())['GoodreadsResponse']['search']['results']['work']);
          return x2js.xml2js(data.toString())['GoodreadsResponse']['search']['results']['work']
            .map(obj => {
              const book: Book = new Book();
              book.id = parseInt(obj['id']['__text'], 10);
              book.original_publication_year = parseInt(obj['original_publication_year']['__text'], 10);
              book.original_publication_month = parseInt(obj['original_publication_month']['__text'], 10);
              book.original_publication_day = parseInt(obj['original_publication_day']['__text'], 10);
              book.title = obj['best_book']['title'];
              book.image_url = obj['best_book']['image_url'];
              book.small_image_url = obj['best_book']['small_image_url'];
              book.author = obj['best_book']['author']['name'];
              book.average_rating = obj['average_rating'];
              return book;
            });
        }),
        tap(_ => this.log('fetched books')),
        catchError(this.handleError<Book[]>('searchBooks', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
}
