import { NgModule } from "@angular/core";
import { ShareModule } from "../../../share-module/share-module.module";
import { HomePageComponent } from "./home-page.component";
import { HomePageRoutingModule } from "./home-page.routing.module";
import { CapitalizeFirstPipe } from "./capitalize-first.pipe";

@NgModule({
    declarations: [HomePageComponent],
    imports: [ShareModule, HomePageRoutingModule, CapitalizeFirstPipe],
})
export class HomePageModule { }