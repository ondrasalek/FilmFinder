import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  constructor(
    private storage: Storage,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.storage.forEach((value, key, index) => {
      console.log(value);
      console.log(key);
      console.log(index);
    });
  }

  deleteAll() {
    this.storage.clear();
    console.log("deleted all favs");
    // this.alertController.create()
  }
}
