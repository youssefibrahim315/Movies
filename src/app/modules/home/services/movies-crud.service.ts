import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { baseURL, rout } from 'src/app/core/config/routes';
import { HttpService } from 'src/app/shared/services/http.service';
import { category } from '../models/category.interface';
import { Movie } from '../models/movie.interface';
import { CategoryEnum } from '../models/movies-category.enum';
import { newMovie } from '../models/newMovie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesCrudService {

  baseURL = baseURL;
  constructor(private HttpService: HttpService) { }

  Create(Movie: FormData): Observable<any> {
    let url = baseURL + rout.Api.movies.Create;
    return this.HttpService.createPostRequest(url, Movie).pipe(catchError(this.handleError))
  }
  update(Movie: FormData,id:any): Observable<Movie> {    
    let url = baseURL + rout.Api.movies.Update  + id ;
    return this.HttpService.createPutRequest(url, Movie).pipe(catchError(this.handleError))
  }
  delete(Movie: Movie): Observable<any> {
    let url = baseURL + rout.Api.movies.Delete + Movie.id;
    return this.HttpService.createDeleteRequest(url).pipe(catchError(this.handleError))
  }
  list(): Observable<Movie[]> {
    let url = baseURL + rout.Api.movies.List;
    return this.HttpService.createGetRequest(url).pipe(catchError(this.handleError))
  }
  moviesByCategory(categoryId: any): Observable<Movie[]> {
    let url = baseURL + rout.Api.movies.ListByCategory + categoryId;
    return this.HttpService.createGetRequest(url).pipe(catchError(this.handleError))
  }
  movieById(movie?: Movie): Observable<Movie> {
    let url = baseURL + rout.Api.movies.Show + movie?.id;
    return this.HttpService.createGetRequest(url).pipe(catchError(this.handleError))
  }
  AllCategory(): Observable<category[]> {
    let url = baseURL + rout.Api.movies.Category.List;
    return this.HttpService.createGetRequest(url).pipe(catchError(this.handleError))
  }
  private handleError(errResponse: HttpErrorResponse) {
    return throwError(errResponse.error);
  }
}
