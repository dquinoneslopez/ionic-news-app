import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  getTopHeadlines() {
    return this.httpClient.get<ResponseTopHeadlines>(
      `https://newsapi.org/v2/everything?q=tesla&from=2021-05-15&sortBy=publishedAt&apiKey=9255a0d404cb4cbfa9d027c310eb73c7`
    );
  }
}
