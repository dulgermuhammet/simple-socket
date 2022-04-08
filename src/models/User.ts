import mongoose from "mongoose";
import config from "../config/settings";


export interface IUser extends mongoose.Document {

  email: string;
  name: string;
  lastName: string;
  language: string;
  country: string;
  password: string;
  online: boolean;
};

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default:false
  },
});


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserModel extends mongoose.Model<IUser>{};
export const User: IUserModel = mongoose.models[config.UserModel] || mongoose.model<IUser,IUserModel>(config.UserModel, userSchema );
