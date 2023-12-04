import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = '/api/v1/movies';
  reviewUrl = '/api/v1/reviews';

  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }

  getMovieByImdbId(imdbId: string) {
    return this.httpClient.get<Movie>(this.url + '/' + imdbId);
  }

  postReview(review: PostReviewRequest) {
    return this.httpClient.post(this.reviewUrl, review);
  }
}

export interface PostReviewRequest {
  imdbId: string;
  reviewBody: string;
}
