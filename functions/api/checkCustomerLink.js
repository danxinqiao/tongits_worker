/**
 * @param context
 * @returns {Promise<Response>}
 */

import { AesManager } from "./aesManager";

export async function onRequest(context) {
  const { request, env } = context;
  // 处理 OPTIONS 预检（即使同源也需响应）
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
  try {
    if (request.method === "POST") {
      const body = await request.json();
      const url = env.PMT_API_BASE + "/web_client/shareMgr/checkCustomerLink";
      const reqData = AesManager.encrypt(body);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ postData: reqData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
