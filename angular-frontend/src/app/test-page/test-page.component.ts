import { Component } from '@angular/core';
import { ApiHandlersService } from '../api/api-handlers.service';
import { map, Subscription } from 'rxjs';
import { ProjectByIdResponse } from '../api/dto';
import { IBoardTab } from 'src/schema/board-tab';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent {
  tabs: IBoardTab[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private api: ApiHandlersService) {}

  ngOnInit() {
    const projectSub = this.api
      .getProjectById(2, 'nik.kh.03')
      .subscribe((value) => (this.tabs = value.body.tabs));

    this.subscriptions.push(projectSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
