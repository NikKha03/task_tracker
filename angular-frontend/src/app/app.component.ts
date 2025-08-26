import { Component, OnInit } from '@angular/core';
import { PathService } from './services/path.service';
import { Observable, switchMap } from 'rxjs';
import { ApiHandlersService } from './api/api-handlers.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'angular-frontend';

    constructor(
        private api: ApiHandlersService,
        private pathService: PathService
    ) {}

    ngOnInit() {
        /** Подписываемся на значения параметров и при изменении делаем запрос в БД */
        this.pathService.queryParams$
            .pipe(
                switchMap((query) => {
                    if (query.projectId && query.boardId) {
                        return this.api.getTasksByTabId(
                            Number.parseInt(query.projectId),
                            Number.parseInt(query.boardId)
                        );
                    } else {
                        return new Observable();
                    }
                })
            )
            .subscribe((params: any) => {
                console.log('Параметры изменились:', params);
            });
    }
}
