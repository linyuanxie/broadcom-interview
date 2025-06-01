import { NgModule } from "@angular/core";
import { ShareModuleModule } from "../../../share-module/share-module.module";
import { HomePageComponent } from "./home-page.component";
import { HomePageRoutingModule } from "./home-page.routing.module";

@NgModule({
    declarations: [HomePageComponent],
    imports: [ShareModuleModule, HomePageRoutingModule]
})
export class HomePageModule { }