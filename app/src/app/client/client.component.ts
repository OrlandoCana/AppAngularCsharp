import { Component, OnInit } from '@angular/core';
import { ClientApiService } from '../services/client-api.service';
import { Response } from '../models/response';
import { DialogClientComponent } from './dialog/dialogClient.component';
import { MatDialog } from '@angular/material/dialog'
import { Client } from '../models/client';
import { DialogDeleteComponent } from '../commom/delete/dialogDelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public lst: any[];
  public nameColumns: string[] = ['id', 'clientName', 'actions'];

  constructor(
    private apiClient: ClientApiService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.lst = []
  }

  ngOnInit(): void {
    this.getClients()
  }

  getClients() {
    this.apiClient.getClients().subscribe(response => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogClientComponent, {
      width: '300'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClients();
    });
  }

  openEdit(client: Client) {
    const dialogRef = this.dialog.open(DialogClientComponent, {
      width: '300',
      data: client
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getClients();
    });
  }

  delete(client: Client) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '300'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiClient.delete(client.id).subscribe(response => {
          if (response.success === "1") {
            this.snackBar.open('client removed successfully', '', {
              duration: 2000
            });
            this.getClients();
          }
        })
      }
    });
  }
}
