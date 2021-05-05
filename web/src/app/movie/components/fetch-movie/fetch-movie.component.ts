import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-fetch-movie',
  templateUrl: './fetch-movie.component.html',
  styleUrls: ['./fetch-movie.component.scss']
})
export class FetchMovieComponent implements OnInit, OnDestroy {
  
  searchMovie: FormControl = new FormControl();
  filteredMovies: Movie[] = [];
  // @ts-ignore
  private subscription: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  getMoviesBySearch() {
    if(this.searchMovie.value) {
      this.subscription = this.movieService.getBySearch(this.searchMovie.value).subscribe(response => {
        this.filteredMovies = response.results;
      });
    } else {
      this.filteredMovies = [];
    }
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
}

