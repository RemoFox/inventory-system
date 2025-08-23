import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { NgChartsModule } from 'ng2-charts';
import { ProductChartComponent } from './pages/product-chart/product-chart.component';
import { MatSelectModule } from '@angular/material/select';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CartComponent } from './pages/cart/cart.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    ProductChartComponent,
    CartComponent,
    PlaceOrderComponent,
    CategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    NotFoundComponent,
  

  ],

  imports: [ 
     FormsModule,
  BrowserModule,
  AppRoutingModule,
BrowserAnimationsModule,
ReactiveFormsModule,
HttpClientModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatCardModule,
MatIconModule,
MatToolbarModule,
MatProgressBarModule,
MatTooltipModule,
NgChartsModule,
  MatSelectModule,
  MatTableModule,
   MatListModule,
ToastrModule.forRoot({
  timeOut: 3000,
  positionClass: 'toast-top-right', // فوق على اليمين
  preventDuplicates: true,
}),
  ],
  providers: [
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
