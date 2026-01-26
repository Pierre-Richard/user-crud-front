import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponentComponent } from './component/list-component/list-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'user-crud-front';
}
