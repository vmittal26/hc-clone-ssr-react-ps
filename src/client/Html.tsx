import { getGlobalStyles } from "./utils/getGlobalStyles";

export const Html = ({ appHtml, styles, title }: any) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
        <meta charSet='utf-8' />
        <meta
        name="description"
        content="Hacker News Clone app"
        />
      <style>
      ${getGlobalStyles()}
      </style>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      ${styles}
    </head>
    <body>
      <div id="app">${appHtml}</div>
      <script type="application/javascript" src="index.js"></script>
    </body>
  </html>
`;
