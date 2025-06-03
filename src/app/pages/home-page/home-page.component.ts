import { Component, OnInit } from '@angular/core';
import { testDataInterface } from '../../interface/commom-interface';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: false
})
export class HomePageComponent implements OnInit {

  filterList = new Set();
  stockDetails: any;
  selectedValue: string = 'All';
  dataList: testDataInterface[];
  orignalList: testDataInterface[];
  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.initalData();
  }

  initalData() {
    this.apiService.getData().subscribe({
      next: (data) => {
        this.dataList = data.sort((a, b) => a.symbol.localeCompare(b.symbol)); // sort initally by symbol value
        this.orignalList = [...this.dataList]; //Make the copy of dataList
        this.filterList.clear();// Clear the filter list
        this.filterList.add('All');// Add All as first option for filter list
        this.orignalList.forEach(v => this.filterList.add(v.tag));// add tag value to the filter list with each value is unique
      },
      error: (e) => {
        console.log(e)
        //handle error here
      }
    })
  };

  applyFilter() {
    if (this.selectedValue == 'All') this.dataList = this.orignalList; // reset table data to orignal full list
    else this.dataList = this.orignalList.filter(v => v.tag == this.selectedValue);// filter out the table th tag value
  }

  showDetails(symbol: string) {
    this.stockDetails = this.orignalList.find(v => v.symbol == symbol);
  }

  resetDetails(symbol: string) {
    if (this.stockDetails?.symbol === symbol) this.stockDetails = null; // reset stock details if deleted stock is displayed
  }

  removeStock(symbol: string) {
    // Remove from UI, in real case it will call api then re-render the table and filter list
    /* this.dataList = this.dataList.filter(v => v.symbol != symbol);
    this.orignalList = this.orignalList.filter(v => v.symbol != symbol); */

    //Call Remove API by pass symbol as parameter (it could be stock id if provide)
    // once deletion is done; call initalData function to re-render the stock table and filter list
    this.apiService.removeStock(symbol).subscribe({
      next: () => {
        this.initalData();
        this.resetDetails(symbol);
      },
      error: (e) => console.log(e)
    })
  }
}
