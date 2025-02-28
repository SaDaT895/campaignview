import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Campaign } from './models/campaign';
import { Channel } from './models/channel';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.apiUrl;

  private _campaigns = new BehaviorSubject<Campaign[]>([]);
  private _channels = new BehaviorSubject<Channel[]>([]);
  public campaigns$ = this._campaigns.asObservable();
  public channels$ = this._channels.asObservable();

  constructor(private httpClient: HttpClient) {}

  getCampaigns() {
    this.httpClient
      .get<Campaign[]>(`${this.baseUrl}/campaigns`)
      .subscribe((campaigns) => this._campaigns.next(campaigns));
  }

  getCampaign(id: number) {
    return this.httpClient.get<Campaign>(`${this.baseUrl}/campaigns/${id}`);
  }

  createChannel(data: any) {
    return this.httpClient
      .post<Channel>(`${this.baseUrl}/channels`, data)
      .pipe(
        tap((channel) =>
          this._channels.next([...this._channels.value, channel])
        )
      );
  }

  getChannels() {
    this.httpClient
      .get<Channel[]>(`${this.baseUrl}/channels`)
      .subscribe((channels) => this._channels.next(channels));
  }

  getChannel(id: number) {
    return this.httpClient.get<Channel>(`${this.baseUrl}/channels/${id}`);
  }

  createCampaign(data: any) {
    return this.httpClient
      .post<Campaign>(`${this.baseUrl}/campaigns`, data)
      .pipe(
        tap((campaign) =>
          this._campaigns.next([...this._campaigns.value, campaign])
        )
      );
  }

  editCampaign(id: number, data: any) {
    return this.httpClient
      .patch<Campaign>(`${this.baseUrl}/campaigns/${id}`, data)
      .pipe(
        tap((newCampaign) =>
          this._campaigns.next(
            this._campaigns.value.map((campaign) =>
              campaign.id === id ? newCampaign : campaign
            )
          )
        )
      );
  }

  editChannel(id: number, data: { name: string }) {
    this.httpClient
      .patch<Channel>(`${this.baseUrl}/channels/${id}`, data)
      .subscribe((newChannel) =>
        this._channels.next(
          this._channels.value.map((channel) =>
            channel.id === id ? newChannel : channel
          )
        )
      );
  }

  deleteCampaign(id: number) {
    this.httpClient
      .delete<Campaign>(`${this.baseUrl}/campaigns/${id}`)
      .subscribe((campaign) =>
        this._campaigns.next(
          this._campaigns.value.filter((val) => val.id !== id)
        )
      );
  }

  deleteChannel(id: number) {
    this.httpClient
      .delete<Channel>(`${this.baseUrl}/channels/${id}`)
      .subscribe((channel) =>
        this._channels.next(this._channels.value.filter((val) => val.id !== id))
      );
  }
}
