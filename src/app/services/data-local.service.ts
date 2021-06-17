import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  news: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }

  saveArticle(article: Article) {
    const exists = this.news.find((art) => art.title === article.title);

    if (!exists) {
      this.news.unshift(article);
      this.storage.set('favorites', this.news);
    }
  }

  loadFavorites() {}
}
