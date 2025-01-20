import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DataService } from '../data.service';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
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
    const dialogRef = this.dialog.open(NewCampaignDialog);
    dialogRef
      .afterClosed()
      .subscribe(
        (campaign) => campaign && this.dataService.createCampaign(campaign)
      );
  }
  campaigns$ = this.dataService.getCampaigns();
  displayedColumns = ['id', 'name', 'createdAt', 'endsAt'];
}

@Component({
  selector: 'new-campaign-dialog',
  templateUrl: 'new-campaign-dialog.html',
  styleUrl: './home.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class NewCampaignDialog {
  readonly dialogRef = inject(MatDialogRef<NewCampaignDialog>);
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date | undefined>(undefined),
    budgetAllocated: new FormControl<number>(0),
  });

  submit() {
    this.dialogRef.close(this.form.value);
  }
}
