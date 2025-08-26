import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlersService } from '../api/api-handlers.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent {
  columns: any[] = [
    { header: 'Нужно сделать' },
    { header: 'В работе' },
    { header: 'Готово' },
  ];

  tasks: object = {};

  constructor(private route: ActivatedRoute, private api: ApiHandlersService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.api
          .getTasksByTabId(2, params['tab'], 'nik.kh.03')
          .subscribe((v) => (this.tasks = v));
      }
    });
  }
}
