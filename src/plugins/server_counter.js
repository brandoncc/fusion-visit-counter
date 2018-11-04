import React from 'react';
import {createPlugin, html, memoize} from 'fusion-core';
import {SessionToken} from 'fusion-tokens';


export default createPlugin({
  deps: {
    Session: SessionToken
  },
  provides({Session}) {
    function tracker (ctx) {
      const session = Session.from(ctx);
      const visits = session.get('pageCounts') || {};

      return function trackVisit (color) {
        const oldCount = visits[color] || 0;
        const newCounts = {
          ...visits,
          [color]: oldCount + 1
        };

        session.set('pageCounts', newCounts);

        return newCounts;
      };
    }

    return {
      from: memoize(ctx => tracker(ctx))
    };
  },
  middleware(_, t) {
    return async (ctx, next) => {
      if (!ctx.element) { return next(); }

      ctx.element = <div id="__FROM_PLUGIN__" style={{height: "100%"}}>{ctx.element}</div>

      await next();

      const track = t.from(ctx);
      const path = ctx.request.url;
      const color = path.match(/\/([^\/]*)$/)[1];

      if (color) {
        const counts = track(color);
        ctx.template.body.push(html`<script type="application/json" id="__COUNTS__">${JSON.stringify(counts)}</script>`);
        ctx.template.body.push(html`<input type="hidden" id="color" value=${color} />`);
      }
    };
  }
});
