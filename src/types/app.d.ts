import express from 'express';
import { IUser, IUserModel} from '../models/User';

declare module 'express-session' {
  interface SessionData {
    user: IUser;
    loggedIn :boolean;
  }
}