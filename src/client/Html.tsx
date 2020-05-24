import * as React from 'react';

export const Html = ({ appHtml, styles, title }: any) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${styles}
    </head>
    <body style="margin:0">
      <div id="app">${appHtml}</div>
      <script type="application/javascript" src="index.js"></script>
    </body>
  </html>
`;