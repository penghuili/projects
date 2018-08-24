import { Pipe, PipeTransform } from '@angular/core';

import { ProjectStatus, mapProjectStatusToText } from '../../model/project';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {
  transform(value: ProjectStatus): string {
    return mapProjectStatusToText(value);
  }
}
