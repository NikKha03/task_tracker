import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

/** Можно будет избавится */
@Injectable({
    providedIn: 'root',
})
export class RouterService {
    constructor(private route: ActivatedRoute, private router: Router) {}

    private params: object = {};

    getParams() {
        this.route.queryParams
            .subscribe((params) => {
                this.params = params;
            })
            .unsubscribe();
    }

    addParams(commands: any[], queryParams: object) {
        this.getParams();
        this.router.navigate(commands, {
            queryParams: { ...this.params, ...queryParams },
        });
    }
}
