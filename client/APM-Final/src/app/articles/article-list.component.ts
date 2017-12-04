import { Component, OnInit, Inject } from '@angular/core';
import { MatSelect, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { IArticle } from './article';
import { ArticleService } from './article.service';

@Component({
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    pageTitle: string = 'Article List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showContent: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredArticles = this.listFilter ? this.performFilter(this.listFilter) : this.articles;
    }

    filteredArticles: IArticle[];
    articles: IArticle[] = [];

    constructor(private _articleService: ArticleService, public dialog: MatDialog) {

    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Article List: ' + message;
    }

    performFilter(filterBy: string): IArticle[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.articles.filter((article: IArticle) =>
            article.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleContent(): void {
        this.showContent = !this.showContent;
    }

    ngOnInit(): void {
        this._articleService.getArticles()
            .subscribe(articles => {
                this.articles = articles;
                this.filteredArticles = this.articles;
            },
            error => this.errorMessage = <any>error);
    }

    openDialog(article) {
        console.log(article)
        this.dialog.open(DialogDataArticleDialog, {
            data: {
                article: article
            }
        });
    }
    deleteDialog(article) {
        console.log(article)
        this.dialog.open(DialogDeleteArticleDialog, {
            data: {
                article: article
            }
        });
    }

    addDialog() {
        this.dialog.open(DialogAddArticleDialog, {
        });
    }
}

@Component({
    selector: 'dialog-data-article-dialog',
    templateUrl: 'dialog-data-article-dialog.html',
})
export class DialogDataArticleDialog {
    constructor( @Inject(MAT_DIALOG_DATA) public data: any , private _articleService: ArticleService) { }
//update article
    updateArticle(id, title, content, tags){
        console.log(id, title, content, tags)
     this._articleService.updateArticle(id, title, content, tags);
     setTimeout(function(){ location.reload(); }, 500);
    }
}

@Component({
    selector: 'dialog-delete-article-dialog',
    templateUrl: 'dialog-delete-article-dialog.html',
})
export class DialogDeleteArticleDialog {
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, private _articleService: ArticleService ) { }

    deleteArticle(id): void {
        this._articleService.deleteArticle(id)
            .subscribe((response) => {
                if (response === 200) {
                    console.log(response);
                }
            }, error => <any>error);
            location.reload();
    }
}

@Component({
    selector: 'dialog-add-article-dialog',
    templateUrl: 'dialog-add-article-dialog.html',
})
export class DialogAddArticleDialog {
    constructor( @Inject(MAT_DIALOG_DATA) public data: any , private _articleService: ArticleService) { }
    public addArticle(addTitle, addContent, addLocation, addTags) {
        console.log(addTitle, addContent, addLocation, addTags)
         this._articleService.addArticle(addTitle, addContent, addLocation, addTags);
         setTimeout(function(){ location.reload(); }, 500);
    }
}
