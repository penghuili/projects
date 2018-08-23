import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Project } from '../../../model/project';
import { Router } from '@angular/router';
import { ROUTES } from '../../../static/routes';

@Component({
  selector: 'mst-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent {
  @Input() project: Project

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigateByUrl(`/${ROUTES.PROJECTS}/${this.project.id}`);
  }
}
