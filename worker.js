addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  // 获取请求的 URL
  const url = new URL(request.url);
  
  // 设置需要转发的路由路径，例如 '/api'
  const routePath = '/api';
  
  // 判断请求的路径是否匹配路由路径
  if (url.pathname.startsWith(routePath)) {
    // 设置目标域名
    const targetDomain = 'https://example.com';
    
    // 检查请求方法是否为 POST
    if (request.method === 'POST') {
      // 获取请求体
      const body = await request.clone().text();
      
      // 对请求体进行加密
      const encryptedBody = await encryptData(body);
      
      // 构造新的请求 URL
      url.host = targetDomain.replace(/^https?:\/\//, '');
      
      // 创建新的请求对象
      const newRequest = new Request(url.toString(), {
        headers: request.headers,
        method: request.method,
        body: encryptedBody,
        redirect: 'follow'
      });
      
      // 发送请求到目标域名
      const response = await fetch(newRequest);
      
      // 设置响应头，允许跨域访问
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Access-Control-Allow-Origin', '*');
      
      // 返回响应
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    } else {
      // 如果不是 POST 请求，直接转发
      url.host = targetDomain.replace(/^https?:\/\//, '');
      
      const newRequest = new Request(url.toString(), {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: 'follow'
      });
      
      const response = await fetch(newRequest);
      
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Access-Control-Allow-Origin', '*');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }
  } else {
    // 如果路径不匹配，返回 404 错误
    return new Response('Not Found', { status: 404 });
  }
}

// 加密数据的函数
async function encryptData(data) {
  // 这里使用 AES 加密作为示例
  // 在实际应用中，你可以使用更安全的加密算法和密钥管理
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  // 生成一个加密密钥（在实际应用中，你应该使用更安全的方式管理密钥）
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
  
  // 使用 AES-GCM 算法加密数据
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12), // 初始化向量
    },
    key,
    dataBuffer
  );
  
  // 将加密后的数据转换为 Base64 编码的字符串
  const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
  
  return encryptedBase64;
}