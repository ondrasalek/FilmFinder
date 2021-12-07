import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  posts$: Observable<Post[]>;
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
