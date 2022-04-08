/* eslint-disable global-require */
import { Express } from "express";
import { IAuthHandler } from "../lib/class-web-auth-handler";
import Controllers from  "../controllers" ;
import {AuthHandler} from "../lib/class-auth-handler";


export default ( app: Express ) => {
    
    const userDetailController = Controllers.userDetailController;
   
    const authHandler  = new AuthHandler( "web" ) as IAuthHandler;

    app.route( "/kullanici-detay" )
        .get(
            authHandler.isLoggedIn,
            userDetailController.get,
        );

};