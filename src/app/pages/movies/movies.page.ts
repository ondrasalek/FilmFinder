import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  posts: Observable<any>;

  searchTerm: string = '';
  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
  }
  searchMovie() {
    this.posts = this.movieService.getPosts(this.searchTerm);
  }
}
