import {environment} from "../environments/environment";

export const CONSTANTS = {
  ENVIRONMENT: environment,

  APP_TITLE: "SESA Lab",
  HOME_PAGE: "HOME",

  LOGIN_WELCOME: "Welcome to the SESA Lab app, which is essential for using the SESA lab at the University of Salerno.",

  URL: {
    LOGIN: `${environment.API_URL}/login`,
    SIGN_UP: `${environment.API_URL}/account/sign-up`,
    PROFILE: `${environment.API_URL}/account/me`
  }
}
