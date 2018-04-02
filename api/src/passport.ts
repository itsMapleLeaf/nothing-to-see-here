import Koa, { Context } from "koa"
import { Middleware } from "koa-compose"
import passport from "koa-passport"
import { Strategy as LocalStrategy } from "passport-local"

import { User } from "./user/types/user.interface"
import { UserService } from "./user/user.service"

export function configurePassport(userService: UserService) {
  passport.serializeUser((user: User, done) => {
    done(null, user.username)
  })

  passport.deserializeUser<User, User["username"]>(async (username: User["username"], done) => {
    try {
      const user = await userService.getUserByUsername(username)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })

  const strategyOptions = {
    usernameField: "usernameOrEmail",
    passwordField: "password",
  }

  passport.use(
    new LocalStrategy(strategyOptions, async (usernameOrEmail, password, done) => {
      try {
        const user = await userService.getUserByUsernameOrEmail(usernameOrEmail)
        if (!user) {
          return done(null, false)
        }
        if (!await userService.isPasswordValid(user.username, password)) {
          return done(null, false)
        }
        done(null, user)
      } catch (error) {
        done(error)
      }
    }),
  )
}

// if passport fails to get the user from the session,
// catch the error and treat the user as if they were logged out
export function safePassportSession(): Middleware<Context> {
  return async (ctx, next) => {
    try {
      await passport.session()(ctx, next)
    } catch (error) {
      console.error("Passport session error", error)
      await next()
    }
  }
}
