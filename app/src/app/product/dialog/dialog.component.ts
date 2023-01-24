import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductApiService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogProductComponent{

  public productName: string;
  public unitPrice: number;
  public cost: number;
    constructor(
        public dialogRef: MatDialogRef<DialogProductComponent>,
        public apiProduct: ProductApiService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public product: Product
    ) {
        this.productName = '';
        if (this.product !== null) {
            this.productName = product.productName;
            this.unitPrice = product.unitPrice;
            this.cost = product.cost;
        }
    }

    close() {
        this.dialogRef.close();
    }

    addProduct() {
        const product: Product = { id: 0, productName: this.productName, unitPrice: this.unitPrice, cost: this.cost };
        this.apiProduct.add(product).subscribe(response => {
            if (response.success === "1") {
                this.dialogRef.close();
                this.snackBar.open('successfully added', '', {
                    duration: 2000
                });
            }
        })
    }

    editProduct() {
        const product: Product = { id: this.product.id, productName: this.productName, unitPrice: this.unitPrice, cost: this.cost };
        this.apiProduct.edit(product).subscribe(response => {
            console.log(response.message)
            if (response.success === "1") {
                this.dialogRef.close();
                this.snackBar.open('successfully edit', '', {
                    duration: 2000
                });
            }
        })
    }

}
