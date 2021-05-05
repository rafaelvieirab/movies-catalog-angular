import { Pipe, PipeTransform } from '@angular/core';
import { the_movie_database_api } from 'src/environments/environment';

@Pipe({
  name: 'addBaseUrlImage'
})
export class AddBaseUrlImagePipe implements PipeTransform {
  private baseUrlImage: string = the_movie_database_api.baseUrlImage;

  transform(poster_path: string, width:number = 200): string {
    return `${this.baseUrlImage}/w${width}/${poster_path}`;
  }

}
