import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  favorites: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
    this.loadFavorites();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }

  saveArticle(article: Article) {
    const exists = this.favorites.find((art) => art.title === article.title);

    if (!exists) {
      this.favorites.unshift(article);
      this.storage.set('favorites', this.favorites);
    }
  }

  async loadFavorites() {
    const favs = await this.storage.get('favorites');
    this.favorites = favs ? [...favs] : [];
  }
}
