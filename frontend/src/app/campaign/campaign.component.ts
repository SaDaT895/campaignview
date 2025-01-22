import { Component, inject, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Channel } from '../models/channel';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-campaign',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatProgressBarModule,
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
})
export class CampaignComponent {
  dataService = inject(DataService);
  dialog = inject(MatDialog);
  campaign!: Campaign;
  channel!: Channel;

  @Input() id!: number;

  ngOnInit() {
    this.dataService.getCampaign(this.id).subscribe((res) => {
      this.campaign = res;
      this.dataService
        .getChannel(res.channelId)
        .subscribe((res) => (this.channel = res));
    });
  }

  editCampaign() {
    const dialogRef = this.dialog.open(EditCampaignDialog, {
      data: {
        campaign: this.campaign,
        channels: this.dataService.getChannels(),
      },
    });
    dialogRef.afterClosed().subscribe((res) =>
      this.dataService.editCampaign(this.campaign.id, res).subscribe((res) => {
        this.campaign = res;
        this.dataService
          .getChannel(res.channelId)
          .subscribe((res) => (this.channel = res));
      })
    );
  }

  getDuration() {
    return Math.floor(
      (new Date(this.campaign.endsAt).getTime() -
        new Date(this.campaign.createdAt).getTime()) /
        (1000 * 3600 * 24)
    );
  }
}

@Component({
  selector: 'edit-campaign-dialog',
  templateUrl: '../home/new-campaign-dialog.html',
  styleUrl: '../home/home.component.scss',
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
export class EditCampaignDialog {
  readonly dialogRef = inject(MatDialogRef<EditCampaignDialog>);
  readonly data = inject<{
    campaign: Campaign;
    channels: Observable<Channel[]>;
  }>(MAT_DIALOG_DATA);

  form = new FormGroup({
    name: new FormControl(this.data.campaign.name, {
      validators: [Validators.required],
    }),
    createdAt: new FormControl<Date>(this.data.campaign.createdAt),
    endsAt: new FormControl<Date | undefined>(this.data.campaign.endsAt, {
      validators: Validators.required,
    }),
    channelId: new FormControl<number | undefined>(
      this.data.campaign.channelId,
      {
        validators: [Validators.required],
      }
    ),
    allocatedBudget: new FormControl<number>(
      this.data.campaign.allocatedBudget,
      {
        validators: [Validators.required],
      }
    ),
    currentExpense: new FormControl<number>(this.data.campaign.currentExpense, {
      validators: [Validators.required],
    }),
  });

  submit() {
    this.dialogRef.close(this.form.value);
  }
}
