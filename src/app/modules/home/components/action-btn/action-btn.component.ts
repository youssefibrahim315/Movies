import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { rout } from 'src/app/core/config/routes';
import { category } from '../../models/category.interface';
import { newMovie } from '../../models/newMovie.interface';
import { MoviesCrudService } from '../../services/movies-crud.service';

@Component({
  selector: 'app-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.scss']
})
export class ActionBtnComponent implements OnInit {
  @Output() reloadData = new EventEmitter();
  @Input() categories: category[] = [];
  private subscriptions: Subscription = new Subscription();
  movieForm: FormGroup = new FormGroup({});
  isSubmit: boolean = false;
  message: string = ''
  newData: FormData = new FormData;

  constructor(
    private MoviesCrudService: MoviesCrudService,
    private fb: FormBuilder,private router:Router
  ) { }
  ngOnInit(): void {
    this.initForm();
  }

  CreateMovie(movie: newMovie) {
    this.movieForm.markAllAsTouched()
    this.newData = this.convertDataBeforPost(movie);
    if (this.movieForm.valid) {
      this.isSubmit = true;
      this.subscriptions.add(
        this.MoviesCrudService.Create(this.newData).subscribe(
          (res: any) => {

            this.reloadData.emit()
          },
          (err) => {
            if (err.message = 'Unauthenticated') {
              this.router.navigate([rout.movies.login])
              console.log(err, "Unauthenticated");
            }
          },
          () => {
            this.isSubmit = false;
          }
        )
      );
    }
  }
  get form() {
    return this.movieForm.controls
  }
  setValueToForm(loginData: newMovie) {
    this.movieForm.patchValue({
      name: loginData.name,
      description: loginData.description,
      image: loginData.image,
      category_id: loginData.category_id,

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
  convertDataBeforPost(movie: any): FormData {
    Object.keys(movie).forEach(key => {
      if (key) {
        if (typeof key == "object") {
        } else {
          key == "image" ? null : this.newData.append(key, movie[key]);
        }
      }
    })
    return this.newData
  }
  filterMoviesByCategory(catId: any) {
    this.reloadData.emit(catId.target.value)
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
