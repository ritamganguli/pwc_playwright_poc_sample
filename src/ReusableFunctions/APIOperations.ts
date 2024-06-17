import { request } from '@playwright/test';

const reqObject={
    statusCode:0,
    responseBody:{

    }
};

export const GetRequest=async(uri:string)=>{
    const response =await (await request.newContext()).get(uri);
    reqObject.statusCode=response.status();
    reqObject.responseBody=await response.json();
    return reqObject;
};

export const PostRequest=async(uri:string,body:object)=>{
    const response =await (await request.newContext()).post(uri,{
        data:body,
        headers:{
            'Content-type':'application/json'
        },
        
    });
    reqObject.statusCode=response.status();
    reqObject.responseBody=await response.json();
    return reqObject;
};

export const PutRequest=async(uri:string,body:object)=>{
    const response =await (await request.newContext()).put(uri,{
        data:body,
        headers:{
            'Content-type':'application/json'
        }
    });
    reqObject.statusCode=response.status();
    reqObject.responseBody=await response.json();
    return reqObject;
};

export const DeleteRequest=async(uri:string)=>{
    const response =await (await request.newContext()).delete(uri);
    reqObject.statusCode=response.status();

    return reqObject;
}
export const PatchRequest=async(uri:string)=>{
    const response =await (await request.newContext()).patch(uri);
    reqObject.statusCode=response.status();

    return reqObject;
}