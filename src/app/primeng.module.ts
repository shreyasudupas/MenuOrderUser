import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import {TabMenuModule} from 'primeng/tabmenu';
import { MessageModule } from 'primeng/message';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {SkeletonModule} from 'primeng/skeleton';
import {RatingModule} from 'primeng/rating';
import {TableModule} from 'primeng/table';
import {BadgeModule} from 'primeng/badge';

@NgModule({
    imports:[ButtonModule,
        TabMenuModule,
        MessageModule,
        CardModule,
        DividerModule,
        SkeletonModule,
        RatingModule,
        TabMenuModule,
        TableModule,
        BadgeModule],
    exports:[ButtonModule,
        TabMenuModule,
        MessageModule,
        CardModule,
        DividerModule,
        SkeletonModule,
        RatingModule,
        TabMenuModule,
        TableModule,
        BadgeModule]
})

export class PrimeNGModule{ }