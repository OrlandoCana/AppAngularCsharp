import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sale } from 'src/app/models/sale';
import { SaleConcept } from 'src/app/models/saleConcept';
import { SaleApiService } from 'src/app/services/sale-api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogSaleComponent implements OnInit {

  public sale: Sale;
  public concepts: SaleConcept[];
  public conceptForm = this.formBuilder.group({
    units: [0, Validators.required],
    amount: [0, Validators.required],
    idProduct: [1, Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<DialogSaleComponent>,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public saleApiService: SaleApiService
  ) { 
    this.concepts = [];
    this.sale = { idClient: 3, concepts: []};
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  addConcept() {
    this.concepts.push(this.conceptForm.value);
  }

  addSale() {
    this.sale.concepts = this.concepts;
    console.log(this.sale);
    this.saleApiService.add(this.sale).subscribe(response => {
      if (response.success === "1") {
        this.dialogRef.close();
        this.snackBar.open('Sale Success', '', {
          duration: 2000
        })
      }
    });
  }
}
