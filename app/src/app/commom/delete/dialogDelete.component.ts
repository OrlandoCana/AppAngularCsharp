import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
    templateUrl: 'dialogDelete.component.html'
})

export class DialogDeleteComponent {
    constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {

    }
}