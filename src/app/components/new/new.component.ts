import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() new: Article;
  @Input() i: number;

  constructor(private iab: InAppBrowser) {}

  ngOnInit() {}

  openNew() {
    const browser = this.iab.create(this.new.url, '_system');
  }
}
