import i18n from "@client/localization";

export interface LoginForm {
  login: string,
  password: string,
}

export const validationSchemas = () =>  ({
  login: {
    required: i18n.t("common:fieldRequired"),
  },
  password: {
    required: i18n.t("common:fieldRequired"),
  },
});

