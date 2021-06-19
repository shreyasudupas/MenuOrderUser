import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
    'providedIn':'root'
})

export abstract class ResourceService<T>{
abstract getVersionUrl():string;
abstract actionName():string;

private apiUrl:string;

    constructor(protected httpclient:HttpClient,@Inject('string') private controller:string){
        this.apiUrl = this.getVersionUrl()+this.controller+'/'+ this.actionName();
    }

    listItems():Observable<T[]>{
       return this.httpclient.get<T[]>(this.apiUrl)
        .pipe(
            map((data:any)=>{
                if(data.response == 200){
                    return data.content as T
                }else{
                    return data.content;
                } 
            }),
            catchError(this.handleError)
        );
    }

    getItem(body:any):Observable<T>{
        return this.httpclient.get<T>(this.apiUrl,body)
        .pipe(
            map((data:any)=>{
                if(data.response == 200){
                    return data.content as T
                }else{
                    return data.content;
                } 
            }),
            catchError(this.handleError)
        );
    }

    createItem(body:any):Observable<T>{
        return this.httpclient.post<T>(this.apiUrl,body)
        .pipe(
            map((data:any)=>{
                if(data.response == 200){
                    return data.content as T
                }else{
                    return data.content;
                } 
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Handle the HTTP error here
        return throwError('Something wrong happened');
      }
}