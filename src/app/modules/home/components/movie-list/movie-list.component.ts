import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { category } from '../../models/category.interface';
import { Movie } from '../../models/movie.interface';
import { MoviesCrudService } from '../../services/movies-crud.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
@Input() moviesList: Movie[] = [];
  @Output() reloadData = new EventEmitter();
  @Input() categories: category[] = [];
  private subscriptions: Subscription = new Subscription();
  movieForm: FormGroup = new FormGroup({});
  isSubmit: boolean = false;
  message: string = '';
  newData: FormData = new FormData;
  currentMovie!: Movie;

constructor(
  private MoviesCrudService: MoviesCrudService,
  private fb: FormBuilder,
) {}
ngOnInit(): void {
  this.initForm();
}
get form() {
  return this.movieForm.controls
}
  async setValueToForm(movie: Movie) { 
    this.currentMovie=movie;
    this.movieForm.patchValue({
      name: movie.name,
      description: movie.description,
      // image: movie.image,
      category_id: movie.category_id,
    });

}
initForm() {
  this.movieForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
  })
}
onFileChange(event: any) {
  if (event?.target?.files?.length > 0) {
    const file = event.target.files[0];
    this.newData.append('image', file)
  }
}
editMovie(form: Movie,currentMovie:Movie) {
  this.movieForm.markAllAsTouched()
  this.newData = this.convertDataBeforPost(form);
  if (this.movieForm.valid) {
    this.isSubmit = true;
    this.subscriptions.add(
      this.MoviesCrudService.update(this.newData,currentMovie.id).subscribe(
        (res: any) => {
          this.reloadData.emit()
        },
        (err) => {
        },
        () => {
          this.isSubmit = false;
        }
      )
    );
  }
}
deleteMovie(currentMovie:Movie) {
  this.movieForm.markAllAsTouched()
  this.subscriptions.add(
    this.MoviesCrudService.delete(currentMovie).subscribe(
      (res: any) => {
        this.reloadData.emit()
      },
      (err) => {
      },
      () => {
        this.isSubmit = false;
      }
    )
  );
}

convertDataBeforPost(movie: any): FormData {
  Object.keys(movie).forEach(key => {
    if (key) {
      if (typeof key == "object") {
      } else {
        key == "image" ?  null :this.newData.append(key, movie[key]);
      }
    }
  })
  return this.newData
}
}
