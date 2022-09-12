import { Injectable } from '@angular/core';
import moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiUrl = environment.apiUrl;
  constructor() {}

  getRelativeDate(date: string): string {
    return moment(date).fromNow();
  }

  getFormattedDate(date: string): string {
    return moment.utc(date).local().format('DD-MM-YYYY HH:mm');
  }

  getFormattedDateOnly(date: string): string {
    return date.split('T')[0];
  }
}
