import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';
import { ProductDto } from './productDto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  private readonly httpClient = inject(HttpClient);

  title = 'Product Catalogue';
  productsSignal = signal<ProductDto[]>([]);

  ngOnInit() {
    this.getProducts().subscribe((products) => {
      this.productsSignal.set(products);
    });

  }

  getProducts(): Observable<ProductDto[]> {
    return this.httpClient
      .get<ProductDto[]>('https://localhost:7007/api/Product');
  }
}