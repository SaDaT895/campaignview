import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Campaign } from './models/campaign';
import { Channel } from './models/channel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  getCampaigns() {
    return this.httpClient.get<Campaign[]>(`${this.baseUrl}/campaigns`);
  }

  getCampaign(id: number) {
    return this.httpClient.get<Campaign>(`${this.baseUrl}/campaigns/${id}`);
  }

  createChannel(data: any) {
    return this.httpClient.post<Channel>(`${this.baseUrl}/channels`, data);
  }

  getChannels() {
    return this.httpClient.get<Channel[]>(`${this.baseUrl}/channels`);
  }

  getChannel(id: number) {
    return this.httpClient.get<Channel>(`${this.baseUrl}/channels/${id}`);
  }

  createCampaign(data: any) {
    return this.httpClient.post<Campaign>(`${this.baseUrl}/campaigns`, data);
  }

  editCampaign(id: number, data: any) {
    return this.httpClient.patch<Campaign>(
      `${this.baseUrl}/campaigns/${id}`,
      data
    );
  }

  editChannel(id: number, data: { name: string }) {
    return this.httpClient.patch<Channel>(
      `${this.baseUrl}/channels/${id}`,
      data
    );
  }

  deleteCampaign(id: number) {
    return this.httpClient.delete<Campaign>(`${this.baseUrl}/campaigns/${id}`);
  }

  deleteChannel(id: number) {
    return this.httpClient.delete<Channel>(`${this.baseUrl}/channels/${id}`);
  }
}
