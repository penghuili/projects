import { Component, OnInit } from '@angular/core';

declare var require: any;
const { version: appVersion } = require('../../../../package.json');

@Component({
  selector: 'mst-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  appVersion = appVersion;

  constructor() { }

  ngOnInit() {
  }

}
