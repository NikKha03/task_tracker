import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectByIdResponse } from './dto';

@Injectable({
    providedIn: 'root',
})
export class ApiHandlersService {
    // private hostApiGateway = 'http://localhost:8080';
    private hostApiGateway = 'https://api.sharpbubbles.ru';

    private userController = `${this.hostApiGateway}/user_service`;
    private projectController = `${this.hostApiGateway}/task_service/project`;
    private tabController = `${this.hostApiGateway}/task_service/tab`;
    private taskController = `${this.hostApiGateway}/task_service/task`;
    private notificationController = `${this.hostApiGateway}/notification_service/`;

    // /task_service/project/2?username=nik.kh.03

    constructor(private http: HttpClient) {}

    getProjectById(id: number, username: string) {
        return this.http.get<ProjectByIdResponse>(
            `${this.projectController}/${id}?username=${username}`
        );
    }

    getTasksByTabId(
        projectId: number,
        tabId: number,
        username: string = 'nik.kh.03'
    ) {
        return this.http.get(
            `${this.taskController}/byTab/${tabId}?projectId=${projectId}&username=${username}`
        );
    }
}
