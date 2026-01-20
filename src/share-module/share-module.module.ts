import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [provideHttpClient()],
  exports: [MatSlideToggleModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatFormFieldModule, MatInputModule]
})
export class ShareModule { }
