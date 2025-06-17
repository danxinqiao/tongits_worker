export async function onRequest(context) {
  const { request, env } = context;
  // 处理 OPTIONS 预检
  if (request.method === "OPTIONS") {
    const origin = request.headers.get("Origin");
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400", // 预检结果缓存24小时
      },
      status: 204,
    });
  }
  // 目标文件的真实地址（需支持 HTTPS）
  const fileUrl = "https://res.tongitspinoy.com/TongitsPinoy.apk";
  const origin = request.headers.get("Origin");
  modifiedResponse.headers.set("Access-Control-Allow-Origin", origin);
  modifiedResponse.headers.set(
    "Access-Control-Expose-Headers",
    "Content-Disposition"
  );
  modifiedResponse.headers.set(
    "Content-Type",
    "application/vnd.android.package-archive"
  );
  modifiedResponse.headers.set(
    "Content-Disposition",
    'attachment; filename="TongitsPinoy.apk"'
  );

  return modifiedResponse;
}
