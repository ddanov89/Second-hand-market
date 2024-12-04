import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class AddComponent implements OnDestroy {

  productSubscription: Subscription | null = null;

  constructor(private apiService: ApiService, private router: Router){}

  category: string = '';

  selectChangeHandler (event: any) {

    this.category = event.target.value;
  }

  create(form: NgForm) {

    if (form.invalid) {
      return;
    }
    
    const {name, image, price, description} = form.value;

    this.productSubscription = this.apiService.createProduct(name, image, description, price, this.category).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }
  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
