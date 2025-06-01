import { Component } from '@angular/core';
import { ShareModuleModule } from '../share-module/share-module.module';
import { ModuleRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [ModuleRoutingModule, ShareModuleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
