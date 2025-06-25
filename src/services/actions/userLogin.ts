import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { jwtDecode } from "jwt-decode";

export const UserLogin = async (formData: FieldValues) => {
  try {
  
const baseURL: string =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL?? "http://localhost:5000/api/v1"
    : process.env.NEXT_PUBLIC_API_BASE_URL_LIVE  ?? "http://localhost:5000/api/v1";

 let res: Response;
    try {
   res = await fetch(
    `${baseURL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      // cache: "no-store",
      credentials: "include",
    }
  );
   } catch (fetchError: any) {
      throw new Error(`Network error. ${fetchError.message || " Server may be down or unreachable."}`);
    }
 
  const userInfo = await res.json();
  const accessToken = userInfo?.data?.accessToken;




   if (accessToken) {
  const passwordChangeRequired = userInfo?.data?.needsPasswordChange;
     const decoded = jwtDecode(accessToken!) as any;

           const redirection =
        decoded?.role === 'student'
          ? '/'
          : decoded?.role === 'manager'
          ? '/dining'
          : '/dashboard';

      setAccessToken(userInfo.data.accessToken, {
         redirect: redirection,
         passwordChangeRequired,
      });
   }


  return userInfo;

    } catch (error: any) {
      console.error("Login error:", error);

      return{
        success: false,
        message: error?.message || "Login failed. Please try again.",
        data: null
      }
      
    }
};
