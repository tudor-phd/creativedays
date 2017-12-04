import { NgModule } from '@angular/core';
import { DialogAddArticleDialog, ArticleListComponent, DialogDataArticleDialog, DialogDeleteArticleDialog } from './article-list.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ArticleGuardService } from './article-guard.service';
import { ArticleService } from './article.service';
import { SharedModule } from './../shared/shared.module';
import {MatSelect} from '@angular/material';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'articles', component: ArticleListComponent},
        { path: 'articles/:id',
          canActivate: [ ArticleGuardService ],
          component: ArticleDetailComponent }
    ]),
    SharedModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    ConvertToSpacesPipe,
    DialogDataArticleDialog,
    DialogAddArticleDialog,
    DialogDeleteArticleDialog
  ],
  providers: [
    ArticleService,
    ArticleGuardService
  ],
  entryComponents: [DialogAddArticleDialog, DialogDataArticleDialog, DialogDeleteArticleDialog ]
})
export class ArticleModule { }
