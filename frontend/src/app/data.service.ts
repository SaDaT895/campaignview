import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  getCampaigns() {
    this.httpClient.get(`${this.baseUrl}/campaigns`);
  }

  createCampaign(data: any) {
    this.httpClient.post(`${this.baseUrl}/campaigns`, data);
  }

  editCampaign(id: number, data: any) {
    this.httpClient.patch(`${this.baseUrl}/campaigns/${id}`, data);
  }

  deleteCampaigns(id: number) {
    this.httpClient.delete(`${this.baseUrl}/campaigns/${id}`);
  }
}
