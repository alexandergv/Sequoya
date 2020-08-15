import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import{ MatDialogModule } from '@angular/material/dialog/';
import { MatSelectModule} from '@angular/material/select';

const myModule = [MatFormFieldModule,MatSelectModule,MatDialogModule, MatSortModule, MatDividerModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule, MatSidenavModule, MatListModule,MatChipsModule,MatPaginatorModule,MatTableModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, myModule, RouterModule],
  exports: [myModule, RouterModule]
})
export class MaterialModule { }
