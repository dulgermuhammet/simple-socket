/* eslint-disable consistent-return */

import { NextFunction, Request, Response } from "express";

export interface IAuthHandler {
    isLoggedIn: (req: Request, res: Response, next: NextFunction) => NextFunction | void;

}

/* eslint-disable class-methods-use-this */
export class WebAuthHandler implements IAuthHandler {

    isLoggedIn( req: Request, res:  Response, next: NextFunction ) {

        if ( req.session.loggedIn ) {

            return next();

        }

        res.redirect( "/giris" );

    }

}
