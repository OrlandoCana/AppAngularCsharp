import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from '../commom/delete/dialogDelete.component';
import { Client } from '../models/client';
import { Product } from '../models/product';
import { ClientApiService } from '../services/client-api.service';
import { ProductApiService } from '../services/product-api.service';
import { DialogProductComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public lst: any[];
  public nameColumns: string[] = ['id', 'productName', 'unitPrice', 'cost','actions'];

  constructor(
    private apiProduct: ProductApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { 
    this.lst = []
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiProduct.getProducts().subscribe(
      response => {
        this.lst = response.data;
      }
    );
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '300'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  openEdit(product: Product) {
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: '300',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  delete(product: Product) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiProduct.delete(product.id).subscribe(response => {
          if (response.success === "1") {
            this.snackBar.open('client removed successfully', '', {
              duration: 2000
            });
            this.getProducts();
          }
        })
      }
    });
  }
}
