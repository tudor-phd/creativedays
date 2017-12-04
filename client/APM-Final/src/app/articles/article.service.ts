import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IArticle } from './article';

@Injectable()
export class ArticleService {
    private baseURL = 'http://localhost:3200';

    constructor(public _router: Router, private _http: HttpClient) { }

    getArticles(): Observable<IArticle[]> {
        return this._http.get<IArticle[]>(this.baseURL + '/articles')
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteArticle(id: string): Observable<number> {
        return this._http.delete(this.baseURL + '/articles/' + id)
            .map((response: Response) => {
                return response.status;
            })
            .catch(this.handleError);
    }

    updateArticle(id, title, content, tags) {
        this._http.patch(this.baseURL + '/article/' + id, {
            title: title,
            content: content,
            tags: tags,
        })
            .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error occured");
            }
            );
    }

    addArticle(addTitle, addContent, addLocation, addTags) {
        this._http.post(this.baseURL + '/articles', {
            title: addTitle,
            content: addContent,
            location: addLocation,
            tags: addTags
        })
            .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error occured");
            }
            );
    }


    getArticle(id: number): Observable<IArticle> {
        return this.getArticles()
            .map((articles: IArticle[]) => articles.find(p => p._id === id));
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
