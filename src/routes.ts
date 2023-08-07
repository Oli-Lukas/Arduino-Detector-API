import { Router } from "express";
import { handleAlert, handleRegisterUser, handleGetUsers } from "./routeHandlers";

const routes = Router();

routes.post('/send_alert/:detectorCode', handleAlert       );
routes.post('/register_user'           , handleRegisterUser);
routes.get ('/users'                   , handleGetUsers    );

export default routes;