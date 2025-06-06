 
import { USER_ROLE } from "@/constant/role";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  child?: DrawerItem[];
}

export type TResponseSuccess = {
  data:any;
  meta?: TMeta;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TGenericErrorMessage[];
};

export type TGenericErrorMessage = {
  path: string | number;
  message: string;
};
