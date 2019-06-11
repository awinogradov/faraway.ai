import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { User } from '../../database/User/User.entity';
import { UserService } from '../../database/User/User.service';
import { to, ServerError } from '../../utils/errors';
import { authCookies } from '../../utils/auth';
import { GraphQLContext } from '../../typings';
import { logger } from '../../utils/logger';

export const authRoutes = Router();

const strategyAuthFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const errorMessage = 'Unauthorized';

passport.use(new JWTStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromHeader(process.env.JWT_HEADER!),
}, async (token, done) => done(null, token.user)));

passport.use('signup', new LocalStrategy(strategyAuthFields, async (email, password, done) => {
  const userService = new UserService();

  const [error, user] = await to<User>(userService.create({ email, password }));

  return done(error, user);
}));

passport.use('login', new LocalStrategy(strategyAuthFields, async (email, password, done) => {
  const userService = new UserService();

  const [error, user] = await to<User>(userService.validate({ email, password }));

  return done(error, user);
}));

export const unauthorizedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[authCookies.token];

  if (!token) return next();

  const auth = await jwt.verify(token, process.env.JWT_SECRET!);

  if (auth) {
    const prevLocation = req.cookies[authCookies.prevLocation];
    return res.redirect(302, prevLocation || '/');
  }

  return next();
};

export const authGQLMiddleware = async (resolve: any, _parent: any, _args: any, ctx: GraphQLContext) => {
  const token = ctx.request.headers[String(process.env.JWT_HEADER)] as string | undefined;

  if (!token) throw new Error(errorMessage);

  const auth = await jwt.verify(token, String(process.env.JWT_SECRET));

  if (!auth) throw new Error(errorMessage);

  return resolve();
};

export const authTestingGQLMiddleware = async (resolve: any, _parent: any, _args: any, ctx: GraphQLContext) => {
  const token = ctx.request.headers[String(process.env.JWT_HEADER)] as string | undefined;

  logger.debug('Checking auth in testing mode');

  if (token !== process.env.JWT_TESTING_TOKEN) throw new Error(errorMessage);

  return resolve();
};

/**
 * Usage:
 * ```
 * server.express.use('/protected', authExpressMiddleware, (req, res) => {
 *   res.json({
 *     user : req.user,
 *   });
 * });
 * ```
 */
export const authExpressMiddleware = passport.authenticate('jwt', { session: false });

authRoutes.post('/signup', passport.authenticate('signup', { session: false }), (req, res) => res.json(req.user));
authRoutes.post('/signin', async (req, res, next) =>
  passport.authenticate('login', async (err, user: User) => {
    if (err || !user){
      const error = new ServerError(errorMessage, 401);
      return next(error);
    }

    req.login(user, { session : false }, async (error) => {
      if ( error ) return next(error)
      const body = { id: user.id, email: user.email };
      const token = jwt.sign({ user: body }, String(process.env.JWT_SECRET));

      return res.json({ token });
    });
})(req, res, next));

authRoutes.get('/signin', unauthorizedMiddleware);
