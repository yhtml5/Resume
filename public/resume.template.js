/**
 * @name 简历模板
 *
 */
const header = `
<section class="page-header">
  <h1 class="project-name">前端开发丨张大漾</h1>
  <h2 class="project-tagline">I work hard to contribute my work back to the web, mobile, server &amp;&amp; new Front-end technology.</h2>
  <a href="https://github.com/yhtml5" class="btn">GitHub</a>
  <a href="https://www.npmjs.com/search?q=yhtml5" class="btn">NPM</a>
  <a href="https://github.com/yhtml5/YHTML5-Tutorial" class="btn">个人学习体系</a>
  <a class="btn" download="张大漾-前端开发.pdf" target="_blank" href="http://resume.yhtml5.com/static/张大漾-前端开发.pdf">下载简历(.pdf)</a>
</section>
`
const footer = `
<footer class="site-footer">
  <span class="site-footer-credits">Copyright © 2015-2018 yhtml5.com 当前呈现版本 v1.2.1</span>
  <br>
  <span class="site-footer-credits">浙ICP备 15027035号-1 浙公网安备 33011802000269号</span>
</footer>
`

function getTemplate({
  htmlWebpackPlugin = {}
}) {
  const {
    title,
    yHasHeader = true,
    yHasFooter = true,
    yMarkdown = ''
  } = htmlWebpackPlugin.options
  return `
  <!DOCTYPE html>
  <html lang="en">

    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1, user-scalable=no">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="HandheldFriendly" content="true">
      <meta name="theme-color" content="#000000">
      <meta name="author" content="" />
      <meta name="keywords" content="">
      <meta name="description" content="">
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <meta http-equiv="Cache-Control" content="no-transform">
      <meta http-equiv="Cache-Control" content="no-siteapp">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <!--other: default, black, black-translucent-->
      <meta name="apple-mobile-web-app-status-bar-style" content="default">
      <meta name="format-detection" content="telephone=no">

      <!--
        manifest.json provides metadata used when your web app is added to the
        homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
      -->
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">

      <title>${title}</title>
    </head>

    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      ${yHasHeader ? header : ''}
      <div id='body' class="main-content">
        ${yMarkdown}
        ${yHasFooter ? footer : ''}
      </div>
      <!--<div>development mode</div>-->
    </body>

  </html>
  `
}
module.exports = getTemplate
