import { Express } from "express";
import userController from "../controllers/userControllers";

export default ( app: Express ) => {

    app.route( "/api/v1/users/createUser" )

        .post( userController.createUser );
};
