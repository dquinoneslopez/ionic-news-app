import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = 'https://newsapi.org/v2';
const headers = new HttpHeaders({
  'X-Api-key': apiKey,
});

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  headlinesPage = 0;

  constructor(private httpClient: HttpClient) {}

  private executeQuery<T>(q: string) {
    const query = apiUrl + q;
    return this.httpClient.get<T>(query, { headers });
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.executeQuery<ResponseTopHeadlines>(
      `/top-headlines?country=us&page=${this.headlinesPage}`
    );
  }

  getTopHeadlinesByCategory(cat: string) {
    return this.executeQuery<ResponseTopHeadlines>(
      `/top-headlines?country=us&category=${cat}`
    );
  }
}
