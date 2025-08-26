import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlersService } from '../api/api-handlers.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  @Input() header: string = '';

  @Input() bgColor: string = '';

  @Input() tasks: object = {};
}
