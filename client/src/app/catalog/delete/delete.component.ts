import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onBack() {
    history.back();
  }

  onDelete() {
    const productId = this.route.snapshot.params['productId'];
    this.apiService.deleteProduct(productId).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }
}
