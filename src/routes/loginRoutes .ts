import { Express } from "express";
import Controllers from  "../controllers" ;
export default ( app: Express ) => {
    
    const loginController = Controllers.loginController;
    
    app.route( "/giris" )
        .get( loginController.get );

};
