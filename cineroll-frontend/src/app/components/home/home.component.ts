import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  faPlayCircle = faPlayCircle;

  interval = 2000;
  pauseOnHover = true;
  pauseOnFocus = true;


  constructor(public movieService: MovieService, private router: Router) {
    this.movieService.getMovies();
  }

  handlePlayButton(imdbId: string) {
    this.router.navigate(['trailer', imdbId]);
  }

  hanldeReviewButton(imdbId: string) {
    this.router.navigate(['review', imdbId]);
  }
}
