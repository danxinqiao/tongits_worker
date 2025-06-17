/**
 * 示例1 post get请求响应
 * {
 * "name": "zs"
 *  "age":18
 * }
 * https://helloworld-5lo.pages.dev/helloworld?name=zs
 * @param context
 * @returns {Promise<Response>}
 */
// export async function onRequest(context) {
//     // 确保处理 POST 请求
//     if (context.request.method === "POST") {
//         try {
//             // 解析 JSON 数据
//             const body = await context.request.json();
//             // const name = body.name;  // 获取 JSON 中的 user 字段
//
//             // 返回包含 user 参数的响应
//             return new Response(`Hello ${JSON.stringify(body)}`);
//         } catch (error) {
//             return new Response("Invalid JSON or Error parsing JSON", { status: 400 });
//         }
//     }else if (context.request.method === "GET") {
//         const url = new URL(context.request.url);  // 获取请求 URL
//         const name = url.searchParams.get('name');  // 提取查询参数 `name`
//
//         // 返回包含 user 参数的响应
//         if (name) {
//             return new Response(name);
//         } else {
//             return new Response("User parameter is missing", { status: 400 });
//         }
//     }
//
//     // 如果不是 POST 请求，返回方法不允许的响应
//     return new Response("Method Not Allowed", { status: 405 });
// }

// import {AesManager} from "./aesManager";
//
// /**
//  * 示例2. aes加密效果
//  * {"sCustomerId":"","sCustomerName":""}
//  * @param context
//  * @returns {Promise<Response>}
//  */
// export async function onRequest(context) {
//     if (context.request.method === "POST") {
//         try {
//             // 解析 JSON 数据
//             const body = await context.request.json();
//             // 返回包含 user 参数的响应
//             const encrypted = AesManager.encrypt(body);
//             return new Response(encrypted);
//         } catch (error) {
//             return new Response("Invalid JSON or Error parsing JSON", { status: 400 });
//         }
//     }
// }


// import {AesManager} from "./aesManager";
//
// const map=new Map()
// map.set("prod","https://prepublish-api.tongitspinoy.com")
// map.set("dev","http://localhost:6102")
//
// export async function onRequest(context) {
//     if (context.request.method === "POST") {
//         const body = await context.request.json()
//         const env=map.get(body.env)//环境
//         if (env==null){//||body.path===""||body.data===null
//             return new Response(JSON.stringify({err: "缺少环境:"+env}));
//         }
//         const url=env+body.path//请求路径
//         const reqData=body.data//实际要请求的数据
//         // await precess(url,reqData)
//
//         const encrypted = AesManager.encrypt(reqData);
//         const req = {postData: encrypted}
//         // if (1==1){
//         //     // return new Response(JSON.stringify(req));//测试加密结果
//         // }
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json; charset=UTF-8',
//                 },
//                 body: JSON.stringify({
//                     req
//                 })
//             });
//             // 如果返回的响应是 JSON 格式
//             if (response.ok) {
//                 const data = await response.json();  // 获取响应的 JSON 数据
//                 return new Response(JSON.stringify(data), {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//             } else {
//                 return new Response(JSON.stringify({ err: "Server returned an error", status: response.status }), { status: response.status });
//             }
//         } catch (error) {
//             return new Response(JSON.stringify({ err: "Request failed", message: error.message }), { status: 500 });
//         }
//     }
// }


// export default {
//     async fetch(request, env, ctx) {
//         return new Response('Hello World!');
//     },
// };


// import {AesManager} from "./aesManager";

// const map = new Map()
// map.set("dev", "http://localhost:6102")//换成本地后端接口
// map.set("prod", "https://prepublish-api.tongitspinoy.com")
// map.set("prod2", "....")
// map.set("prod3", "....")

// export default {
//     async fetch(request, env, ctx) {
//         return merge(request)
//     },
// };

// export async function onRequest(context) {
//     return merge(context.request)
// }

// async function merge(request) {
//     if (request.method === "OPTIONS") {
//         return new Response(null, {
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'POST, OPTIONS',
//                 'Access-Control-Allow-Headers': 'Content-Type',
//                 'Access-Control-Max-Age': '86400', // 预检结果缓存24小时
//             },
//             status: 204
//         });
//     }
//     if (request.method === "POST") {
//         const body = await request.json()
//         const baseUrl = map.get(body.env)//环境
//         if (baseUrl == null) {//||body.path===""||body.data===null
//             return new Response(JSON.stringify({err: "Missing environment:" + body.env}));
//         }
//         const url = baseUrl + body.path//请求路径
//         const reqData = body.data//实际要请求的数据
//         const encrypted = AesManager.encrypt(reqData);
//         const req = {postData: encrypted}
//         // if (1==1){
//         //     return new Response(JSON.stringify(req));//测试加密结果
//         // }
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json; charset=UTF-8',
//                 },
//                 body: JSON.stringify(req)
//             });
//             // 如果返回的响应是 JSON 格式
//             if (response.ok) {
//                 const data = await response.json();  // 获取响应的 JSON 数据
//                 return withCors(new Response(JSON.stringify(data)));
//                 // return new Response(JSON.stringify(data), {
//                 //     headers: { 'Content-Type': 'application/json' }
//                 // });
//             } else {
//                 return withCors(new Response(JSON.stringify({
//                     err: "Server returned an error",
//                     status: response.status
//                 }), {status: response.status}));
//             }
//         } catch (error) {
//             return withCors(new Response(JSON.stringify({err: "Request failed", message: error.message}), {status: 500}));
//         }
//     }
// }






// function withCors(response) {
//     response.headers.set('Access-Control-Allow-Origin', '*');
//     response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
//     return response;
// }

