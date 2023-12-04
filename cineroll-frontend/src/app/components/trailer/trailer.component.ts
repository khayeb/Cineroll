import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent {
  constructor(
    public movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    const imdbId = this.activatedRoute.snapshot.paramMap.get('imdbId');
    if (imdbId) {
      this.movieService.getMovie(imdbId);
    }
  }
}
