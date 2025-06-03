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
        this.initalFilterList()
      },
      error: (e) => {
        console.log(e)
        //handle error here
      }
    })
  };

  initalFilterList() {
    this.filterList.clear();// Clear the filter list
    this.filterList.add('All');// Add All as first option for filter list
    this.orignalList.forEach(v => this.filterList.add(v.tag));// add tag value to the filter list with each value is unique 
   
    this.selectedValue = 'All'; // reset selected value to All
  }
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
    
    //Call Remove API by pass symbol as parameter (it could be stock id if provide)
    // once deletion is done; call initalData function to re-render the stock table and filter list
    // Or if data is large and we do not want to re-render the whole table then we can just filter out the deleted stock from dataList after deletion is done
    this.apiService.removeStock(symbol).subscribe({
      next: () => {
        // this.initalData(); // Uncomment this line if you want to re-fetch the data from API after deletion

        //For page performance, we are not re-fetching the data from API after deletion.
        this.dataList = this.dataList.filter(v => v.symbol != symbol) // Filter out the deleted stock from display dataList table
        this.orignalList = this.orignalList.filter(v => v.symbol != symbol) // Filter out the deleted stock from orignalList
       // If filtered stocks are all deleted then reset filter to all and remove the tag from filter list
        if(this.dataList.length ==0) {
          this.dataList = this.orignalList;
          this.initalFilterList()
        }
        this.resetDetails(symbol);
      },
      error: (e) => console.log(e)
    })
  }
}
