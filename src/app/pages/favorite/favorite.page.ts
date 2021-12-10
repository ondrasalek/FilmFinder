import { Component, OnInit } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';

import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit, ViewWillEnter {
  list = [];

  constructor(
    private storageService: StorageService,
    public alertController: AlertController,
  ) {
  }

  async ngOnInit() {
  }
  async ionViewWillEnter() {
    await this.storageService.get("favorites").then(favorites => {
      this.list = favorites;
    });
  }

  deleteAllFavs() {
    if (this.list.length > 0) {
      this.alertController.create({
        header: 'Delete all favorites',
        message: 'Are you sure you want to delete all favorites?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'DELETE',
            handler: () => {
              this.storageService.remove("favorites");
              this.ionViewWillEnter();
            }
          }]
      }).then(alert => alert.present());
    }
    else {
      this.alertController.create({
        header: 'Delete all favorites',
        message: 'You dont have favorite movies',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }
        ]
      }).then(alert => alert.present());
    }
  }
  deleteItem(item: Post) {
    this.alertController.create({
      header: 'Delete this film?',
      message: item.Title,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'DELETE',
          handler: () => {
            this.list = this.list.filter(fav => fav.imdbID !== item.imdbID ? fav : null);
            this.storageService.set("favorites", this.list);
          }
        }]
    }).then(alert => alert.present());
    this.ionViewWillEnter();
  }
}
