export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method === "GET" && url.pathname.startsWith("/share/")) {
    const userAgent = request.headers.get("User-Agent") || "";
    const isCrawler = /googlebot|facebookexternalhit|Facebot/i.test(userAgent);
    const dynamicPath = context.params.id;

    if (isCrawler) {
      // 爬虫请求，重写路径为 /seo/xxx.html
      const newPath = url.pathname.replace("/share", "/seo") + ".html";
      const newUrl = url.origin + newPath + url.search;
      const newRequest = new Request(newUrl, {
        method: request.method,
        headers: request.headers,
      });
      return await fetch(newRequest);
      // const seoUrl = new URL(`/seo/${dynamicPath}.html`, url.origin);
      // const originResponse = await fetch(seoUrl, request);

      // // 动态生成需要的内容（示例）
      // const dynamicUrl = `https://${url.origin}/${dynamicPath}`;
      // const dynamicImage = `https://${url.origin}/images/share_4.png`;

      // // 使用 HTMLRewriter 修改内容
      // const rewriter = new HTMLRewriter()
      //   .on('meta[property="og:url"]', {
      //     element: (element) => {
      //       element.setAttribute("content", dynamicUrl);
      //     },
      //   })
      //   .on('meta[property="og:image"]', {
      //     element: (element) => {
      //       element.setAttribute("content", dynamicImage);
      //     },
      //   });

      // return rewriter.transform(originResponse);
    } else {
      return Response.redirect(
        new URL(`/${dynamicPath}${url.search}`, url.origin),
        301
      );
    }
  }

  // 对于其他请求直接放行
  return fetch(request);
}
