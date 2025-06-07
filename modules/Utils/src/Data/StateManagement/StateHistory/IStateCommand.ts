import { SimpleNameValueCollection } from "../../SimpleNameValueCollection";
import { IBOInstance } from "../../IBOInstance";

export type IStateCommand = (value: IBOInstance| SimpleNameValueCollection, commit?: boolean) => [boolean, IBOInstance]