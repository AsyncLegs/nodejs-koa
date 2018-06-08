import { Summary } from '../models';
export default () => async (hash, ctx, next) => {
    const summary = await Summary.findOne({ hash });
    if (!summary) {
        throw new AppError({status: 404, message: `Summary "${hash}" not found` });
    }
    ctx.summary = summary;
    await next();
};
