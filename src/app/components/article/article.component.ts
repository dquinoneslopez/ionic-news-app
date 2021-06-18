import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Article } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() i: number;
  @Input() favs: boolean;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private actionSheetCtrl: ActionSheetController,
    private dataLocalService: DataLocalService
  ) {}

  ngOnInit() {}

  openArticle() {
    const browser = this.iab.create(this.article.url, '_system');
  }

  async launchMenu() {
    let saveDeleteBtn;

    if (this.favs) {
      saveDeleteBtn = {
        text: 'Remove',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.removeArticle(this.article);
        },
      };
    } else {
      saveDeleteBtn = {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.saveArticle(this.article);
        },
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Share',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            this.socialSharing.share(
              this.article.title,
              this.article.source.name,
              '',
              this.article.url
            );
          },
        },
        saveDeleteBtn,
        {
          text: 'Cancel',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
