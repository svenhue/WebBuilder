import { SimpleNameValueCollection } from "../../SimpleNameValueCollection.js";
import { IBOInstance } from "../../IBOInstance.js";

export type IStateCommand = (value: IBOInstance| SimpleNameValueCollection, commit?: boolean) => [boolean, IBOInstance]