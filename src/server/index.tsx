import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as Express from "express";
import App from "client/App";
import { ServerStyleSheet } from 'styled-components';
import { Html } from "client/Html";
import { StaticRouter } from "react-router-dom";

declare const module: any;

function main() {
  const express = Express();
  const port = 8080;

  express.use('/favicon.ico', Express.static('./favicon.ico'));
  express.use(Express.static("build"));

  express.get("/*", (req, res, next) => {
    const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
    const appHtml = ReactDOM.renderToString(sheet.collectStyles(
      <StaticRouter location={req.path} context={{}}>
        <App />
      </StaticRouter>));
    const styles = sheet.getStyleTags();
    const title = 'Hacker News Clone App';

    res.send(
      Html({
        appHtml,
        styles,
        title
      })
    );
    res.end();
    next();
  });

  const server = express.listen(process.env.PORT || 5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
