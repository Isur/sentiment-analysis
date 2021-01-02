export default (app: string, initData: string): string => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Sentiment Analisys</title>
  <link rel="shortcut icon" href="/public/images/favicon.ico" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  ${process.env.NODE_ENV === "production" ? `<link rel="stylesheet" href="/style.css">` : ""}
</head>
  <body>
    <div id="react-app">${app}</div>
    <script type="application/json" id="initData">${initData}</script>
    <script type="text/javascript" src="/client.js"></script>
  </body>
</html>
  `;
};
