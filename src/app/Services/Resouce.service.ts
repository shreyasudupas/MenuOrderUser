import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceServiceForkRequest } from '../Models/ResouceService/ResourceServiceForkRequest';

@Injectable({
    'providedIn':'root'
})

export abstract class ResourceService<T>{
abstract getVersionUrl():string;
abstract actionName():string;
requestUrls:any[]=[];
response:any[]=[];

private apiUrl:string;

    constructor(protected httpclient:HttpClient,@Inject('string') private controller:string,@Inject('string') actionName?:string){
        if(controller != '')
        this.apiUrl = this.getVersionUrl()+this.controller+'/'+ this.actionName();
        else
        this.apiUrl = this.getVersionUrl()+this.actionName();

        if(this.actionName()== undefined){
            this.apiUrl = this.getVersionUrl()+actionName;
        }
    }

    listItems():Observable<T[]>{
       return this.httpclient.get<T[]>(this.apiUrl)
        .pipe(
            map((data:any)=>{
                if(data.response == 200){
                    return data.content as T
                }else if(data.response == 500){
                    this.CallErrorHandler(data.exception);
                }
                else{
                    return data.content;
                } 
            }),
            catchError(this.handleError)
        );
    }

    getItem(params:HttpParams):Observable<T>{
        return this.httpclient.get<T>(this.apiUrl,{params:params})
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

    getItemsByFork(forkRequest:ResourceServiceForkRequest):Observable<any[]>{
        for(let i=0;i<forkRequest.requestParamter.length;i++){
            var requestParam = forkRequest.requestParamter[i];
            if(requestParam.httpMethod == 'get'){
                this.requestUrls[i] = this.httpclient.get(requestParam.requestUrl);
            }else if(requestParam.httpMethod == 'post'){
                this.requestUrls[i] = this.httpclient.post(requestParam.requestUrl,requestParam.body);
            }
            
        }
        return forkJoin(this.requestUrls)
        .pipe(
            map((results:any[]) =>{
                for(var r=0;r<results.length;r++){
                    if(results[r].response == 200){
                        this.response[r] = results[r].content;
                    }
                }
                return this.response;
            }),
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        // Handle the HTTP error here
        return throwError(error);
      }
    private CallErrorHandler(error:any){
        return throwError(error)
    }
}