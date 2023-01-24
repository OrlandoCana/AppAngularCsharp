import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Client } from 'src/app/models/client';
import { ClientApiService } from 'src/app/services/client-api.service'

@Component({
    templateUrl: 'dialogClient.component.html'
})
export class DialogClientComponent {
    public clientName: string;
    constructor(
        public dialogRef: MatDialogRef<DialogClientComponent>,
        public apiClient: ClientApiService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public client: Client
    ) {
        this.clientName = '';
        if (this.client !== null) {
            this.clientName = client.clientName
        }
    }

    close() {
        this.dialogRef.close();
    }

    addClient() {
        const client: Client = { id: 0, clientName: this.clientName };
        this.apiClient.add(client).subscribe(response => {
            console.log(response.message)
            if (response.success === "1") {
                this.dialogRef.close();
                this.snackBar.open('successfully added', '', {
                    duration: 2000
                });
            }
        })
    }

    editClient() {
        const client: Client = { id: this.client.id, clientName: this.clientName }
        this.apiClient.edit(client).subscribe(response => {
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