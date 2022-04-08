import { Express } from "express";
import home from "./homeRoute";
import login from  "./loginRoutes ";
import userDetailRoute from  "./userDetailRoute";

export default ( app: Express ) => {
    home( app );
    login( app );
    userDetailRoute(app);
};
