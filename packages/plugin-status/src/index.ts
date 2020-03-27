import * as Koa from 'koa';

export default (ursa: any, options: any = {}): Koa.Middleware => async (ctx: Koa.Context, next: Function) => {
    try {
        await next();
    } catch (err) {
        /* eslint-disable no-underscore-dangle */
        if (typeof options._error === 'function') {
            return options._error(err, ctx);
        }

        throw err;
    }

    const { status } = ctx.response;

    if (typeof options[`_${status}`] === 'function') {
        return options[`_${status}`](ctx);
    }
};
