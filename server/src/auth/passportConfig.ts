// src/auth/passportConfig.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/UserModel';

const userModel = new UserModel();

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await userModel.loginUser(username, password);
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.UserID);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.getUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
