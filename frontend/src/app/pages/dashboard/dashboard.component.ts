// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Role!: string;
  products: any[] = [];
  totalProducts = 0;
  totalUsers = 0;
  totalQuantity = 0;
  totalStockValue = 0;
  selectedCategory: string = 'All';
  categories: any[] = [];
  chartLabels: string[] = [];
  chartData: number[] = [];
  usersCount!:number;
 environment=environment

productPieChartData: ChartConfiguration<'doughnut'>['data'] = {
  labels: [' Product Ratio ', 'Remaining '],
  datasets: [
    {
      data: [0, 100],  
      backgroundColor: ['#1976d2', '#e0e0e0'], 
      borderWidth: 0
    }
  ],
};
productPieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
  responsive: true,
  cutout: '70%',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          return context.label + ': ' + context.formattedValue + '%';
        }
      }
    }
  }
};

  ordersList: Order[] = [];
  ordersCount = 0;
  displayedColumns: string[] = ['_id', 'itemsCount', 'totalAmount', 'createdAt', 'details'];
  expandedIndex: number | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private orderService:OrderService
  ) {}

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.Role = role;
    });

    this.loadCategories();
    this.loadData();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  loadData() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.updateStats();
    });

    this.loadOrders();
   
    this.getUsersCount();

  }

  updateStats() {
    const filtered = this.selectedCategory === 'All'
      ? this.products
      : this.products.filter(p => p.category?.name === this.selectedCategory);

    this.totalProducts = filtered.length;
    this.totalQuantity = filtered.reduce((sum, p) => sum + p.quantity, 0);
    this.totalStockValue = filtered.reduce((sum, p) => sum + (p.price * p.quantity), 0);

    this.chartLabels = filtered.map(p => p.name);
    this.chartData = filtered.map(p => p.quantity);


 this.totalProducts = filtered.length;
const maxProducts = this.products.length || 1;
const percentage = Math.round((this.totalProducts / maxProducts) * 100);
this.productPieChartData = {
  ...this.productPieChartData,
  datasets: [
    {
      ...this.productPieChartData.datasets[0],
      data: [percentage, 100 - percentage],
    }
  ]
};


  }

  onCategoryChange() {
    this.updateStats();
  }

  
loadOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.ordersList = res.orders;
        this.ordersCount = res.count;
      },
      error: (err) => {
        console.error('Error loading orders', err);
      }
    });
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }



getUsersCount(){
  this.authService.getUserCount().subscribe(users=>{
     this.usersCount = users.count
  })
}



}
