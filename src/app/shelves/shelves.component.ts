import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';
import {Shelf} from '../shelf';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.scss']
})
export class ShelvesComponent implements OnInit {
  shelves: Shelf[] = [];
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getShelves();
  }

  getShelves(): void {
    this.bookService.getShelves()
      .subscribe(shelves => this.shelves = shelves);
  }

  addShelf(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.bookService.addShelf({title} as Shelf)
      .subscribe(shelves => this.shelves = shelves);
  }

  removeShelf(shelf: Shelf): void {
    this.bookService.removeShelf(shelf)
      .subscribe(shelves => this.shelves = shelves);
  }

}
