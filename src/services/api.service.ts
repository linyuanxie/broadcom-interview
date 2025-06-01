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
    const testData: testDataInterface[] = [
      {
        symbol: "AAPL",
        lastPrice: 133,
        tag: "forFriends",
        marketCap: "3.0T",
        name: "Apple"
      },
      {
        symbol: "CSCO",
        lastPrice: 51,
        tag: "watching",
        marketCap: "200.0B",
        name: "Cisco"
      },
      {
        symbol: "T",
        lastPrice: 29,
        tag: "watching",
        marketCap: "200.8B",
        name: "ATT"
      },
      {
        symbol: "VMW",
        lastPrice: 165,
        tag: "favorite",
        marketCap: "60.0B",
        name: "VMWare"
      },
      {
        symbol: "AVGO",
        lastPrice: 165,
        tag: "favorite",
        marketCap: "1.13T",
        name: "Broadcom"
      }
    ]
    // return a observable, in real case it uses https like: 
    //return this.https.get('apiUrl');

    return new Observable<testDataInterface[]>(observe => {
      observe.next(testData);
    });
  }

  removeStock(stockSymbol: string) {
    return this.https.delete(`deleteAPiUrl/${stockSymbol}`);
  }
}
