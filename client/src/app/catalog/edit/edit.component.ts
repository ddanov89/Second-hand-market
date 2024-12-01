import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../types/product';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', Validators.required),
    category: new FormControl(''),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];
    this.apiService.getProductDetails(productId).subscribe((product) => {
      this.editForm.get('name')?.setValue(product.name);
      this.editForm.get('image')?.setValue(product.image);
      this.editForm.get('price')?.setValue(product.price);
      this.editForm.get('category')?.setValue(product.category);
      this.editForm.get('description')?.setValue(product.description);
    });
  }

  editProduct() {

    const productId = this.route.snapshot.params['productId'];

    const name = this.editForm.value.name;
    const image = this.editForm.value.image;
    const price = this.editForm.value.price;
    const category = this.editForm.value.category;
    const description = this.editForm.value.description;

    this.apiService
      .updateProduct(productId,  { name, image, price, category, description} )
      .subscribe(() => {
        this.router.navigate(['/catalog']);
      });
  }
}
