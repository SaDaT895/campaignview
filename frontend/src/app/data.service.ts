import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Campaign } from './campaign';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  getCampaigns() {
    return this.httpClient.get<Campaign[]>(`${this.baseUrl}/campaigns`);
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

  deleteCampaigns(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/campaigns/${id}`);
  }
}
