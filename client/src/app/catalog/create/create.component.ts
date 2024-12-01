import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class AddComponent {

  constructor(private apiService: ApiService, private router: Router){}

  category: string = '';

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.category = event.target.value;
  }

  create(form: NgForm) {

    if (form.invalid) {
      return;
    }
    const {name, image, price, description} = form.value;
    this.apiService.createProduct(name, image, description, price, this.category).subscribe(() => {
      this.router.navigate(['/catalog']);
    })
    
  }
}
