import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  favorites: Article[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.init();
    this.loadFavorites();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }

  async presentToast(msg: string = '') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000,
    });
    toast.present();
  }

  saveArticle(article: Article) {
    const exists = this.favorites.find((fav) => fav.title === article.title);

    if (!exists) {
      this.favorites.unshift(article);
      this.storage.set('favorites', this.favorites);
      this.presentToast('Article saved to favorites.');
    }
  }

  async loadFavorites() {
    const favs = await this.storage.get('favorites');
    this.favorites = favs ? [...favs] : [];
  }

  removeArticle(article: Article) {
    this.favorites = this.favorites.filter(
      (fav) => fav.title !== article.title
    );
    this.presentToast('Article removed from favorites.');
  }
}
