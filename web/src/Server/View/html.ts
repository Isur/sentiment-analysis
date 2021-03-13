export default (app: string, initData: string, language: unknown): string => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Isomorphic React App</title>
  <link rel="shortcut icon" href="/public/images/favicon.ico" />
  ${process.env.NODE_ENV === "production" ? `<link rel="stylesheet" href="/style.css">` : ""}
</head>
  <body>
    <div id="react-app">${app}</div>
    <script type="application/json" id="initData">${initData}</script>
    <script type="application/json" id="locales">${language}</script>
    <script type="text/javascript" src="/client.js"></script>
  </body>
</html>
  `;
};
