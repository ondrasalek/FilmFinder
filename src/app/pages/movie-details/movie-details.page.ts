import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private storageService: StorageService
  ) {
    const id = this.route.snapshot.paramMap.get("id");
    this.post$ = this.movieService.getPost$(id);
  }

  ngOnInit() {
  }
  addFavorite() {
    this.post$.subscribe(p => {
      this.storageService.set(p.imdbID, p);
    });

  }
}
