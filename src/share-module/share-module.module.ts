import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [provideHttpClient()],
  exports: [MatSlideToggleModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class ShareModuleModule { }
