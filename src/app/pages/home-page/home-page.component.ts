import { Component, Input, OnInit } from '@angular/core';
import { testDataInterface } from '../../interface/commom-interface';
import { ApiService } from '../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStockComponent } from '../add-stock/add-stock.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: false
})
export class HomePageComponent implements OnInit {

  @Input() test: string;
  filterList = new Set();
  stockDetails: testDataInterface | null;
  selectedValue: string = 'All';
  dataList: testDataInterface[];
  orignalList: testDataInterface[];
  constructor(private apiService: ApiService, private addStockDialog: MatDialog) {
  }
  name = 'Angular';
  ngOnInit(): void {
    this.initalData();

    //Test

    
    //Test End
  }
  initalData() {
    this.apiService.getData().subscribe({
      next: (data) => {
        this.dataList = data.sort((a, b) => a.symbol.localeCompare(b.symbol)); // sort initally by symbol value
        this.orignalList = [...this.dataList]; //Make the copy of dataList
        this.initalFilterList();
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
    const foundDetail = this.orignalList.find(v => v.symbol == symbol);
    this.stockDetails = foundDetail ? foundDetail : null;
  }

  resetDetails(symbol: string) {
    if (this.stockDetails?.symbol === symbol) this.stockDetails = null; // reset stock details if deleted stock is displayed
  }

  removeStock(symbol: string) {
    this.apiService.removeStock(symbol).subscribe({
      next: () => {
        //For page performance,if data is huge, we are not re-fetching the data from API after deletion is successful.
        this.dataList = this.dataList.filter(v => v.symbol != symbol) // Filter out the deleted stock from display dataList table
        this.orignalList = this.orignalList.filter(v => v.symbol != symbol) // Filter out the deleted stock from orignalList
        // If filtered stocks are all deleted then reset filter to all and remove the tag from filter list
        if (this.dataList.length == 0) {
          this.dataList = this.orignalList;
          this.initalFilterList();
        }
        this.resetDetails(symbol);
      },
      error: (e) => console.log(e)
    })
  }

  openAddStockDialog() {
    // open add stock dialog
    const dialogRef = this.addStockDialog.open(AddStockComponent, {
      data: {
        message: 'Add New Stock'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.symbol) {
        // If dialog return result, meaning new stock is added successfully
        this.dataList.push(result); // add new stock to dataList
        this.orignalList.push(result); // add new stock to orignalList
        this.dataList = this.dataList.sort((a, b) => a.symbol.localeCompare(b.symbol)); // sort dataList by symbol value
        this.orignalList = this.orignalList.sort((a, b) => a.symbol.localeCompare(b.symbol)); // sort orignalList by symbol value
        this.initalFilterList(); // re-initialize filter list to include new tag if new tag is added
        this.applyFilter(); // re-apply filter to include new stock if filter is not All
      }
    });
  }
}
