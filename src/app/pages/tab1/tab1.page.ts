import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  news: Article[] = [];
  subscriptions: Subscription[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews(event?) {
    this.subscriptions.push(
      this.newsService.getTopHeadlines().subscribe((resp) => {
        if (resp.articles.length === 0) {
          if (event) {
            event.target.disabled = true;
            event.target.complete();
            return;
          }
        }
        this.news.push(...resp.articles);
        if (event) {
          event.target.complete();
        }
      })
    );
  }

  loadData(event) {
    this.loadNews(event);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
