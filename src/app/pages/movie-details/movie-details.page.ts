import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from './../../services/movie.service';
import { StorageService } from 'src/app/services/storage.service';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';
import { AlertController, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit, ViewWillEnter {
  post$: Observable<Post>;
  list = [];
  id: string;
  item: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private storageService: StorageService,
    public alertController: AlertController,
    public router: Router
  ) {

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.router.url.split('/')[1] == 'favorite') {
      this.item = this.storageService.getItem(this.id);
      this.post$ = this.item;
    }
    else if (this.router.url.split('/')[1] == 'movies') {
      this.post$ = this.movieService.getPost$(this.id);
    }
  }

  ngOnInit() {
  }
  async ionViewWillEnter() {
  }

  async addFavorite() {
    this.post$.subscribe(p => {
      if (this.storageService.get('favorites')) {
        this.storageService.get('favorites').then(favorites => {
          if (favorites === null) {
            favorites = [];
          } {
            this.list = favorites;
            if (favorites.find(f => f.imdbID === p.imdbID)) {
              this.alertController.create({
                header: 'Already in favorites',
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel'
                  }
                ]
              }).then(alert => alert.present());
            } else {
              this.list.push(p);
              this.storageService.set("favorites", this.list);
              console.log(this.list);

              this.alertController.create({
                header: 'Added to favorites',
                buttons: [
                  {
                    text: 'ADD',
                    role: 'cancel'
                  }
                ]
              }).then(alert => alert.present());
            }
          }
        });
      }
    });
  }
}
