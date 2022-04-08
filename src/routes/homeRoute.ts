/* eslint-disable global-require */
import { Express } from "express";
import { IAuthHandler } from "../lib/class-web-auth-handler";
import Controllers from  "../controllers" ;
import {AuthHandler} from "../lib/class-auth-handler";


export default ( app: Express ) => {
    
    const homeController = Controllers.homeController;
   
    const authHandler  = new AuthHandler( "web" ) as IAuthHandler;

    app.route( "/" )
        .get(
            authHandler.isLoggedIn,
            homeController.get,
        );

};
