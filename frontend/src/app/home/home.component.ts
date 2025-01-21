import { Component, inject, OnInit } from '@angular/core';
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
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { Channel } from '../models/channel';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Campaign } from '../models/campaign';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  dataService = inject(DataService);
  dialog = inject(MatDialog);
  router = inject(Router);
  data: Campaign[] = [];
  campaigns$ = this.dataService.getCampaigns();
  channels$ = this.dataService.getChannels();
  displayedColumns = ['id', 'name', 'createdAt', 'endsAt', 'actions'];

  addData() {
    const dialogRef = this.dialog.open(NewCampaignDialog, {
      data: { channels: this.channels$ },
    });
    dialogRef.afterClosed().subscribe(async (campaign) => {
      campaign &&
        this.dataService
          .createCampaign({ ...campaign, currentExpense: 0 })
          .subscribe((res) => console.log(res));
    });
  }

  deleteCampaign(id: number) {
    this.dataService.deleteCampaigns(id).subscribe();
  }

  viewCampaign(id: number) {
    this.router.navigateByUrl(`/${id}`);
  }
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
    MatSelectModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
})
export class NewCampaignDialog {
  readonly dialogRef = inject(MatDialogRef<NewCampaignDialog>);
  readonly data = inject<{
    channels: Observable<Channel[]>;
  }>(MAT_DIALOG_DATA);

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    createdAt: new FormControl<Date>(new Date()),
    endsAt: new FormControl<Date | undefined>(undefined, {
      validators: Validators.required,
    }),
    channelId: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required],
    }),
    allocatedBudget: new FormControl<number>(0, {
      validators: [Validators.required],
    }),
  });

  submit() {
    this.dialogRef.close(this.form.value);
  }
}
