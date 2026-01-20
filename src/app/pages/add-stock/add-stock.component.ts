import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareModule } from '../../../share-module/share-module.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  imports: [ShareModule],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.scss'
})

export class AddStockComponent {
  addStockForm!: FormGroup;
  duplicateSymbol: boolean = false;
  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddStockComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.addStockForm = this.fb.group({
      stockName: ['', [Validators.required, Validators.maxLength(50)]],
      symbol: ['', [Validators.required, Validators.pattern('^[A-Za-z]{1,5}$')]],
      tag: ['', [Validators.required, Validators.maxLength(20)]],
      price: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]],
      marketCap: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]]
    });

  }

  onSubmit() {
    this.duplicateSymbol = false; //reset duplicate symbol error state
    if (this.addStockForm.valid) {
      const { symbol, stockName: name, tag, price: lastPrice, marketCap } = this.addStockForm.value;
      const newStock = {
        symbol: symbol,
        name: name,
        tag: tag,
        lastPrice: lastPrice,
        marketCap: marketCap
      };

      this.apiService.addStock(newStock).subscribe({
        next: (value: any) => {
          this.dialogRef.close(value);
        },
        error: (e: any) => {
          if (e.status === 400) {
            // Handle specific 400 error if needed
            this.duplicateSymbol = true;
          } else {
            // Handle other errors
            console.error('An error occurred:', e);
          }
        }
      })
    } else {
      this.addStockForm.markAllAsTouched();
    }
  }
}

