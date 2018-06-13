import pick from 'lodash/pick';
import { User } from '../../users';
import { UserService } from '../../users/services';
import jwtService from '../../../services/jwt-service';
export default {
    async signUp(ctx) {
        const userData = pick(ctx.request.body, User.createFields);
        const { _id } = await UserService.createUser(userData);
        const user = await UserService.getUserWithPublicFields({ _id });
        ctx.status = 201;
        ctx.body = { data: user };
    },

    async signIn(ctx) {
        const { email, password } = ctx.request.body;
        if (!email || !password) {
            ctx.throw(400, { message: 'Invalid data'});
        }
        const user = await User.findOne({ email });

        if (!user) {
            ctx.throw(400, 'User not found');
        }
        if (!user.checkPassword(password)) {
             ctx.throw(400, 'Invalid data');
        }


        const token = await jwtService.generateToken({ email });
        ctx.body = { data: token };
    },
    currentUser(ctx) {
        ctx.body = { data: ctx.state.user.serialized() };
    },
};

