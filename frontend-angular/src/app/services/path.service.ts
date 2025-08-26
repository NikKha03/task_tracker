import { Injectable } from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    ParamMap,
    Router,
} from '@angular/router';
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';

export interface IQueryParams {
    projectId: string | null;
    boardId: string | null;
}

/** Сервис для отслеживания изменений значений параметров в URL */
@Injectable({
    providedIn: 'root',
})
export class PathService {
    public queryParams$ = new BehaviorSubject<IQueryParams>({
        projectId: null,
        boardId: null,
    });

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.initQueryParamsTracking();
    }

    private initQueryParamsTracking() {
        this.router.events
            .pipe(filter((e) => e instanceof NavigationEnd))
            .subscribe(() => this.updateQueryParams());
    }

    private async updateQueryParams(): Promise<void> {
        const params: ParamMap = await firstValueFrom(
            this.activatedRoute.queryParamMap
        );

        /** Сбрасываем board если меняется project */
        if (
            this.queryParams$.value.projectId &&
            this.queryParams$.value.projectId !== params.get('project')
        ) {
            this.router.navigate([], {
                queryParams: { project: params.get('project'), board: null },
            });
        }

        this.queryParams$.next({
            projectId: params.get('project'),
            boardId: params.get('board'),
        });
    }
}
