/* eslint-disable global-require */
import { Express } from "express";
import authController from "../controllers/authControllers";

export default ( app: Express ) => {

    app.route( "/api/v1/auth" )
        .post( authController.logIn );

};