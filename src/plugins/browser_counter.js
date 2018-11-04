
import React from 'react';
import {createPlugin} from 'fusion-core';

export default createPlugin({
  deps: {},
  provides() {
    return {};
  },
  middleware(_, _prov) {
    return async (ctx, next) => {
      if (!ctx.element) { return next(); }

      ctx.element = <div id="__FROM_PLUGIN__" style={{height: "100%"}}>{ctx.element}</div>

      return next();
    }
  }
});
