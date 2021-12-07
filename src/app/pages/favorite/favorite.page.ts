import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  list = [];

  constructor(
    private storageService: StorageService,
    public alertController: AlertController
  ) {
    this.loadFavs();
  }

  async ngOnInit() {
  }
  deleteAll() {
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
            this.storageService.clear();
          }
        }]
    }).then(alert => alert.present());
  }

  loadFavs() {
    this.storageService.forEach((key) => {
      this.storageService.get(key).then(value => console.log(value));
    });
  }

}
