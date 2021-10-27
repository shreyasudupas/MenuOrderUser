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
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import { DropdownModule } from "primeng/dropdown";
import {DataViewModule} from 'primeng/dataview';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PasswordModule} from 'primeng/password';

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
        BadgeModule,
        ToastModule,
        ProgressSpinnerModule,
        DropdownModule,
        TooltipModule,
        DataViewModule,
        InputTextModule,
        CheckboxModule,
        RadioButtonModule,
        PasswordModule],
    exports:[ButtonModule,
        TabMenuModule,
        MessageModule,
        CardModule,
        DividerModule,
        SkeletonModule,
        RatingModule,
        TabMenuModule,
        TableModule,
        BadgeModule,
        ToastModule,
        ProgressSpinnerModule,
        DropdownModule,
        TooltipModule,
        DataViewModule,
        InputTextModule,
        CheckboxModule,
        RadioButtonModule,
        PasswordModule
    ]
})

export class PrimeNGModule{ }