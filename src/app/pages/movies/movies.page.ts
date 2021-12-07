import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  posts$: any;
  searchTerm = '';

  constructor(
    private movieService: MovieService,
  ) { }

  async ngOnInit() {
  }
  searchMovie() {
    this.posts$ = this.movieService.getPosts$(this.searchTerm);
  }
}
