import express from 'express';
import {createUser, loginUser} from '../applications/user'; 
import user from '../infastructure/schemas/user';

 

 export const  userRoute = express.Router();

 userRoute.route('/signup').post(createUser);
 userRoute.route('/signin').post(loginUser);

  export default userRoute;


