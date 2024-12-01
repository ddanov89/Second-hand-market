import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/footer/footer.component";
import { HeaderComponent } from "./core/header/header.component";
import { AuthenticateComponent } from './authenticate/authenticate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, AuthenticateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'second-hand-store';
}
