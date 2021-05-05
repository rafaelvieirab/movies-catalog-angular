import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-featured-movie',
  templateUrl: './featured-movie.component.html',
  styleUrls: ['./featured-movie.component.scss']
})
export class FeaturedMovieComponent implements OnInit, OnDestroy {
  
  // @ts-ignore
  featuredMovie: Movie;
  // @ts-ignore
  private subscription: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void { 
    this.subscription = this.movieService.getLatest().subscribe(response => {
      this.featuredMovie = response;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
