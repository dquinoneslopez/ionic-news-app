import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  news: Article[] = [];

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadNews(this.segment.value);
  }

  changeCategory(event) {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  loadNews(cat: string) {
    this.subscriptions.push(
      this.newsService.getTopHeadlinesByCategory(cat).subscribe((resp) => {
        this.news = [...resp.articles];
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
