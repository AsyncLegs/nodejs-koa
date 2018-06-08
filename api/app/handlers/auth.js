export default () => async (ctx, next) => {
    console.log(ctx.user);
    if (!ctx.user) {
        ctx.throw(403, { message: 'Forbidden'});
    }

    await next();
};
