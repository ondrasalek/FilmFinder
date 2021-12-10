import { Component, OnInit } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
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
    this.loadFavs();
  }

  deleteAllFavs() {
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
          text: 'Okay',
          handler: () => {
            this.storageService.set("favorites", []);
          }
        }]
    }).then(alert => alert.present());
  }

  loadFavs() {
    this.storageService.get("favorites").then(favs => {
      this.list = favs;
    });
  }
}
