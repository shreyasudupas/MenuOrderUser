export class ResourceServiceForkRequest{
    requestParamter:RequestResource[];
    
}

export class RequestResource{
    requestUrl:string;
    httpMethod:string;
    body?:any;
}