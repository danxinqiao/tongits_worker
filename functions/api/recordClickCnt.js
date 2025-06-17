/**
 * @param context
 * @returns {Promise<Response>}
 */

import { AesManager } from "./aesManager";

export async function onRequest(context) {
  const { request, env } = context;
  // 处理 OPTIONS 预检
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400", // 预检结果缓存24小时
      },
      status: 204,
    });
  }

  // 仅允许 POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: request.method }), {
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const body = await request.json();
    const url = env.PMT_API_BASE + "/web_client/shareMgr/checkCustomerLink";
    const encryptedData = AesManager.encrypt(body);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ postData: encryptedData }),
    });

    // 透传后端响应
    const responseData = await response.json();
    return new Response(JSON.stringify(responseData), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
