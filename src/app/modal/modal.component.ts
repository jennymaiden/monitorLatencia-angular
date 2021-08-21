import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ParametrizacionComponent} from '../dashboard/parametrizacion/parametrizacion.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  data1: string;
  constructor(public dialogRef: MatDialogRef<ParametrizacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
    this.data1 = data;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
