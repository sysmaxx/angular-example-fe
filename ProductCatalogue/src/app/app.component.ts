import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';
import { ProductDto } from './productDto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryDto } from './categoryDto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  private readonly httpClient = inject(HttpClient);

  productsSignal = signal<ProductDto[]>([]);
  categoriesSignal = signal<CategoryDto[]>([]);

  ngOnInit() {
    this.getProducts().subscribe((products) => {
      this.productsSignal.set(products);
    });

    this.getCategories().subscribe((categories) => {
      this.categoriesSignal.set(categories);
    });
  }

  getProducts(): Observable<ProductDto[]> {
    return this.httpClient
      .get<ProductDto[]>('https://localhost:7007/api/Products');
  }

  getCategories(): Observable<CategoryDto[]> {
    return this.httpClient
      .get<CategoryDto[]>('https://localhost:7007/api/Categories');
  }
}