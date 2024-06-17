import {expect, test} from '@playwright/test';


import * as AmazonHomeActions from '../src/PageObjectModel/login.page';
import * as AmazonTestData from '../TestData/testData.json';
import * as APIOperations from '../src/ReusableFunctions/APIOperations';



test("Get request jsonplaceholder",async()=>{
    const requestObject=await APIOperations.GetRequest(process.env.baseuri+'/posts/1');
    expect(requestObject.statusCode).toBe(200);
    expect(requestObject.responseBody).toStrictEqual({
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      });
});

test("Post request jsonplaceholder",async()=>{
    const requestObject=await APIOperations.PostRequest(process.env.baseuri+'/posts',{
        title: 'Hello',
        body: 'World',
        userId: 6,
      });
    expect(requestObject.statusCode).toBe(201);
    expect(requestObject.responseBody).toStrictEqual({
        id: 101,
        title: 'Hello',
        body: 'World',
        userId: 6
      });  
});

test("Put request jsonplaceholder",async()=>{
    const requestObject=await APIOperations.PutRequest(process.env.baseuri+'/posts/1',{
        id: 1,
        title: 'Hello',
        body: 'World',
        userId: 1,
      });
    expect(requestObject.statusCode).toBe(200);
    expect(requestObject.responseBody).toStrictEqual({
        id: 1,
        title: 'Hello',
        body: 'World',
        userId: 1,
      });  
});

test("Delete request jsonplaceholder",async()=>{
    const requestObject=await APIOperations.DeleteRequest(process.env.baseuri+'/posts/1');
    expect(requestObject.statusCode).toBe(200);
})

