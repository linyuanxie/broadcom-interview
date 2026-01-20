import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { testDataInterface } from '../app/interface/commom-interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private https: HttpClient) { }
  getData(): Observable<testDataInterface[]> {
    return this.https.get<testDataInterface[]>('api/stocklist');
  }

  removeStock(stockSymbol: string) {
    return this.https.delete(`api/stock/${stockSymbol}`);
  }

  addStock(newStock: testDataInterface) {
    return this.https.post('api/stock', newStock);
  }

}
