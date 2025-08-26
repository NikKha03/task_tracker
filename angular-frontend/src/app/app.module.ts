import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ColumnComponent } from './column/column.component';
import { AreaComponent } from './area/area.component';
import { NavProjectComponent } from './nav-project/nav-project.component';
import { IBoardTabsComponent } from './board-tabs/board-tabs.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    TestPageComponent,
    ColumnComponent,
    AreaComponent,
    NavProjectComponent,
    IBoardTabsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
