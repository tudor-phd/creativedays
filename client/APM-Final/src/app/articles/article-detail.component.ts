import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IArticle } from './article';
import { ArticleService } from './article.service';

@Component({
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  pageTitle: string = 'Article Detail';
  errorMessage: string;
  article: IArticle;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService) {
  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getArticle(id);
    }
  }

  getArticle(id: number) {
    this._articleService.getArticle(id).subscribe(
      article => this.article = article,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this._router.navigate(['/articles']);
  }

}
