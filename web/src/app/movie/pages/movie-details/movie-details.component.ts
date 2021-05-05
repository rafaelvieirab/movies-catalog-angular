import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { the_movie_database_api } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieId: number = 0;
  //@ts-ignore
  movie: Movie = {};
  //@ts-ignore
  private movieSubscription: Subscription;

  recommendations: Movie[] = [];
  similar: Movie[] = [];
  //@ts-ignore
  private recommendationsSubscription: Subscription;
  //@ts-ignore
  private similarSubscription: Subscription;
  
  rateMovie: (number | null) = null;
  isMyList: boolean = false;
  baseUrlImage: string = the_movie_database_api.baseUrlImage;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  
  toRateMovie() {}

  toggleAddMyList() {
    this.isMyList = !this.isMyList;
  }

  ngOnInit() {
    this.movieId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
    this.movieSubscription = this.movieService.getById(this.movieId).subscribe(response => {
      this.movie = response;
    });
    
    this.recommendationsSubscription = this.movieService.getRecommendationsById(this.movieId).subscribe(response => {
      this.recommendations = response.results;
    });

    this.similarSubscription = this.movieService.getSimilarById(this.movieId).subscribe(response => {
      this.similar = response.results;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.recommendationsSubscription.unsubscribe();
    this.movieSubscription.unsubscribe();
    this.similarSubscription.unsubscribe();
  }
}
