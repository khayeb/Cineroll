import { Injectable, signal, Signal, computed } from '@angular/core';
import { Movie, Review } from '../models/movie';
import { HttpService } from './http.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies = signal<Movie[]>([]);
  selectedMovie = signal<Movie>({
    backdrops: [],
    genres: [],
    imdbId: '',
    poster: '',
    releaseDate: '',
    reviewIds: [],
    title: '',
    trailerLink: '',
  });

  embedTrailerLink = computed(() => {
    if (this.selectedMovie()) {
      const videoId = this.getVideoId(this.selectedMovie()!?.trailerLink);

      return this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0`
      );
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('');
  });

  reviewsForSelectedMovie: Signal<Review[] | null> = computed(() => {
    const tempMovie = this.movies().find(
      (movie) => movie.imdbId === this.selectedMovie()!?.imdbId
    );
    if (tempMovie) {
      return tempMovie.reviewIds;
    }
    return null;
  });

  constructor(
    private httpService: HttpService,
    private sanitizer: DomSanitizer
  ) {}

  getMovies() {
    this.httpService.getMovies().subscribe((movies: Movie[]) => {
      this.movies.set(movies);
    });
  }

  getMovie(imdbId: string) {
    this.httpService.getMovieByImdbId(imdbId).subscribe((movie: Movie) => {
      this.selectedMovie.set(movie);
    });
  }

  getVideoId(url: string) {
    return url.substring(url.indexOf('?v=') + 3);
  }
}
