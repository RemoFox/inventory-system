import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { authGuard } from './guard/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = 
[
{path:'',component:ProductsComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'home',component:HomeComponent},

{path:'products',component:ProductsComponent},
{path: 'addProduct', component:AddProductComponent, canActivate:[authGuard] },
{path: 'edit-product/:id',component: EditProductComponent, canActivate:[authGuard]},

{ path:'cart', component:CartComponent, canActivate:[authGuard] },
{path:'place-order',component:PlaceOrderComponent, canActivate:[authGuard]},

{path:'category-list',component:CategoryComponent, canActivate:[authGuard],},
{path:'add-category',component:AddCategoryComponent, canActivate:[authGuard]},
{path:'edit-category/:id',component:EditCategoryComponent, canActivate:[authGuard]},

{path:'dashboard',component:DashboardComponent, canActivate:[authGuard]},
{path:'not-found',component:NotFoundComponent},
{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
