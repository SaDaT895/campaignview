import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Campaign } from '../campaign';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dataService = inject(DataService);
  dialog = inject(MatDialog);
  addData() {
    this.dialog.open(NewCampaignDialog);
  }
  campaigns$ = this.dataService.getCampaigns();
  displayedColumns = ['id', 'name', 'createdAt', 'endsAt'];
}

@Component({
  selector: 'new-campaign-dialog',
  templateUrl: 'new-campaign-dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class NewCampaignDialog {
  readonly dialogRef = inject(MatDialogRef<NewCampaignDialog>);
}
