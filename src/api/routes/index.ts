import { Express } from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";


export default ( app: Express ) => {

    authRoute( app );
    userRoute( app );
};
