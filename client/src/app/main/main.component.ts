import { Component } from '@angular/core';
import { CatalogComponent } from "../catalog/catalog-list/catalog.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CatalogComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
