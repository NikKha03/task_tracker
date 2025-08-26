import { Component, Input } from '@angular/core';
import { IBoardTab } from 'src/schema/board-tab';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-board-tabs',
    templateUrl: './board-tabs.component.html',
    styleUrls: ['./board-tabs.component.css'],
})
export class IBoardTabsComponent {
    @Input() tabs: IBoardTab[] = [{ tabId: 1, name: 'TEST' }];

    constructor(
        private route: ActivatedRoute,
        private routerService: RouterService
    ) {}

    clickTab(id?: number) {
        this.routerService.addParams([], {
            board: id,
        });
    }

    clickTab2() {
        this.routerService.addParams([], {
            project: Math.floor(Date.now() / 1000),
            board: null,
            // project: 2,
        });
    }
}
