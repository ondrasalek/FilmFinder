import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './../../services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { alertController } from '@ionic/core';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';

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
    private storageService: StorageService,
  ) {
    const id = this.route.snapshot.paramMap.get("id");
    this.post$ = this.movieService.getPost$(id);
  }

  ngOnInit() {
  }

  addFavorite() {
    alertController.create({
      header: 'Added to favorites',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    }).then(alert => alert.present());
    this.post$.subscribe(p => {
      this.storageService.set(p.imdbID, p);
    });
  };
}
