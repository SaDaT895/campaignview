import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { DataService } from '../data.service';
import { MatButtonModule } from '@angular/material/button';
import {
  FormArray,
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
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Channel } from '../models/channel';
import { Observable, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Campaign } from '../models/campaign';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    DatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  dataService = inject(DataService);
  dialog = inject(MatDialog);
  router = inject(Router);
  campaings = new MatTableDataSource<Campaign>();

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort) sort!: MatSort;

  campaigns$ = this.dataService.campaigns$.subscribe(
    (campaigns) => (this.campaings.data = campaigns)
  );
  channels$ = this.dataService.channels$;
  displayedColumns = ['id', 'name', 'createdAt', 'endsAt', 'actions'];

  ngOnInit(): void {
    this.dataService.getChannels();
    this.dataService.getCampaigns();
  }

  ngAfterViewInit() {
    this.campaings.sort = this.sort;
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.campaings.filter = filterValue.trim().toLowerCase();
  }

  createCampaign() {
    const dialogRef = this.dialog.open(NewCampaignDialog, {
      data: { channels: this.channels$ },
    });
    dialogRef.afterClosed().subscribe(async (campaign) => {
      campaign && this.dataService.createCampaign(campaign).subscribe();
    });
  }

  manageChannels() {
    this.dialog.open(ManageChannelsDialog);
  }

  deleteCampaign(id: number) {
    this.dataService.deleteCampaign(id);
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
    currentExpense: new FormControl<number>(0),
  });

  submit() {
    this.dialogRef.close(this.form.value);
  }
}

@Component({
  selector: 'manage-channels-dialog',
  templateUrl: 'manage-channels-dialog.html',
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
    CommonModule,
    MatIconModule,
  ],
})
export class ManageChannelsDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ManageChannelsDialog>);
  readonly dataService = inject(DataService);

  ngOnInit(): void {
    this.dataService.channels$.pipe(take(1)).subscribe((res) =>
      res.forEach(
        (channel) =>
          channel &&
          (this.form.get('channels') as FormArray).push(
            new FormGroup({
              id: new FormControl(channel.id),
              name: new FormControl(channel.name, {
                validators: [Validators.required],
              }),
            })
          )
      )
    );
  }

  channels = new FormArray<
    FormGroup<{
      id: FormControl<number | undefined>;
      name: FormControl<string>;
    }>
  >([]);
  form = new FormGroup({
    channels: this.channels,
  });

  addChannel() {
    this.channels.push(
      new FormGroup({
        id: new FormControl<number | undefined>(undefined, {
          nonNullable: true,
        }),
        name: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }

  createOrEditChannel(id: number) {
    const channelId = this.channels.at(id).controls.id.value;
    const channelName = this.channels.at(id).controls.name.value;
    channelId
      ? this.dataService.editChannel(channelId, { name: channelName })
      : this.dataService
          .createChannel({ name: channelName })
          .subscribe((res) =>
            this.channels.at(id).controls.id.patchValue(res.id)
          );
  }

  deleteChannel(id: number) {
    const channelId = this.channels.at(id).controls.id.value;
    this.channels.removeAt(id);
    channelId && this.dataService.deleteChannel(channelId);
  }
}
