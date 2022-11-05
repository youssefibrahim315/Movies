import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  form!: FormData;
  constructor() { }
  convertToFormData(data: any): FormData {
    Object.keys(data).forEach(key => {
      if (data[key]) {
        
        if (typeof data[key] == "object"){}
      
      } else {
          this.form.append(key, data[key]);
        }
    })
    return this.form
  }

}
