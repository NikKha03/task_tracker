import { IBoardTab } from 'src/schema/board-tab';
import { ProjectType } from 'src/schema/project';

export interface ProjectByIdResponse {
  headers: {};
  body: {
    projectId: number;
    name: string;
    projectType: ProjectType;
    tabs: IBoardTab[];
    team: any[];
  };
  statusCode: string;
  statusCodeValue: number;
}
