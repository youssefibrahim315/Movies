import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { baseURL, rout } from 'src/app/core/config/routes';
import { category } from './models/category.interface';
import { Movie } from './models/movie.interface';
import { MoviesCrudService } from './services/movies-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private subscriptions: Subscription = new Subscription();
  moviesList: Movie[] = [];
  categories: category[] = [];
  message: string = ''

  constructor(private MoviesCrudService: MoviesCrudService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMovies();
    this.getAllcategories()
  }
  getAllMovies(catId?: any) {
    if (!catId) {
      this.subscriptions.add(
        this.MoviesCrudService.list().subscribe(
          (res: any) => {
            this.moviesList = res.message.map((movie: Movie) => {
              movie.image = baseURL + '/' + movie.image;
              return movie;
            });
          },
          (err) => {
            if (err.message = 'Unauthenticated') {
              this.router.navigate([rout.movies.login])
            }
          },
          () => {
            console.log('finish');
          }
        )
      );
    } else {
      this.filterMoviesByCategory(catId)
    }
  }
  getAllcategories() {
    this.subscriptions.add(
      this.MoviesCrudService.AllCategory().subscribe(
        (res: any) => {
          this.categories = res.message.map((category: category[]) => category)
          this.message = "success";
        },
        (err) => {
          if (err.message = 'Unauthenticated') {
            this.router.navigate([rout.movies.login])
          }
        },
        () => {
        }
      )
    );
  }
  filterMoviesByCategory(catId: any) {
    this.subscriptions.add(
      this.MoviesCrudService.moviesByCategory(catId).subscribe(
        (res: any) => {
          this.moviesList = res.message.map((movie: Movie) => {
            movie.image = baseURL + '/' + movie.image;
            return movie;
          });
        },
        (err) => {
          if (err.message = 'Unauthenticated') {
            this.router.navigate([rout.movies.login])
          }
        },
        () => {
          console.log('finish');
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
