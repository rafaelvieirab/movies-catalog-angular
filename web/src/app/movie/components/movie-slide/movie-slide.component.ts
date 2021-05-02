import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-slide',
  templateUrl: './movie-slide.component.html',
  styleUrls: ['./movie-slide.component.scss']
})
export class MovieSlideComponent implements OnInit {

  @Input() text: string = '';
  @Input() movies: Movie[] = [];

  cont:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  previous() {
    const sliderElem = document.getElementById('slider-movies');
    if(sliderElem) {
      if(this.cont>2) {
        sliderElem.style.transform = `translateX(${this.cont*4}50px)`;
        this.cont--;
      } else {
        this.cont = 1;
      }
    }
  }

  next() {
    const sliderElem = document.getElementById('slider-movies');
    if(sliderElem) {
      if(this.cont<=4) {
        sliderElem.style.transform = `translateX(-${this.cont*4}50px)`;
        this.cont++;
      } else {
        this.cont = 1;
      }
    }
  }

}
