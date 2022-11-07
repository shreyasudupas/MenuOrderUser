import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceServiceForkRequest } from '../Models/resouce-service/ResourceServiceForkRequest';
import { of } from 'rxjs';

@Injectable({
    'providedIn':'root'
})

export abstract class ResourceService<T>{
requestUrls:any[]=[];
response:any[]=[];
ERROR_EVENT:string = "Error occurred"; 
public requestUri:string;


    constructor(public httpclient:HttpClient){}

    listItems(params:HttpParams):Observable<T[]>{
       return this.httpclient.get<T[]>(this.requestUri,{params:params})
        .pipe(
            map((data:any)=>{
                return data as T[];
            }),
            catchError(this.handleError)
        );
    }

    getItem(params:HttpParams):Observable<T>{
        return this.httpclient.get<T>(this.requestUri,{params:params})
        .pipe(
            map((data:any)=>{
                return data as T; 
            }),
            catchError(this.handleError)
        );
    }

    createItem(body:any):Observable<T>{
        return this.httpclient.post<T>(this.requestUri,body)
        .pipe(
            map((data:any)=>{
                return data as T;
            }),
            catchError(this.handleError)
        );
    }

    getItemsByFork(forkRequest:ResourceServiceForkRequest):Observable<any[]>{
        for(let i=0;i<forkRequest.requestParamter.length;i++){
            var requestParam = forkRequest.requestParamter[i];
            if(requestParam.httpMethod == 'get'){
                this.requestUrls[i] = this.httpclient.get(requestParam.requestUrl).pipe(
                    catchError((err:any)=>{ 
                    console.log(err);
                     return of('Error occurred')
                    })
                );
            }else if(requestParam.httpMethod == 'post'){
                this.requestUrls[i] = this.httpclient.post(requestParam.requestUrl,requestParam.body).pipe(
                    catchError((err:any)=>{ 
                        console.log(err);
                        return of("Error occurred")
                    })
                );
            }
            
        }
        return forkJoin(this.requestUrls)
        .pipe(
            map((results:any[]) =>{
                for(var r=0;r<results.length;r++){
                    this.response[r] = results[r];
                }
                return this.response;
            }),
            catchError(this.handleError)
        )
    }

    updateItem(body:any):Observable<T>{
        return this.httpclient.put<T>(this.requestUri,body)
        .pipe(
            map((data:any)=>{
                return data as T;
            }),
            catchError(this.handleError)
        );
    }

    deleteItem(queryParams:HttpParams): Observable<T>{
        return this.httpclient.delete<T>(this.requestUri,{params: queryParams})
        .pipe(
            map((data:any)=>{
                return data as T;
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Handle the HTTP error here
        return throwError(error);
      }
    private CallErrorHandler(error:any){
        return throwError(error)
    }
}