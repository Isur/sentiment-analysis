import i18n from "@client/localization";

export interface RegisterForm {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
}

export const validationSchemas = () => ({
  email: {
    required: i18n.t("common:fieldRequired"),
    pattern: {
      value: /S+@S+.S+/,
      message: i18n.t("common:fieldFormatEmail"),
    },
  },
  username: {
    required: i18n.t("common:fieldRequired"),
    minLength: {
      value: 4,
      message: i18n.t("common:fieldMinLength"),
    },
  },
  password: {
    required: i18n.t("common:fieldRequired"),
    minLength: {
      value: 8,
      message: i18n.t("common:fieldMinLength"),
    },
  },
  confirmPasswords: {
    required: i18n.t("common:fieldRequired"),
  },
});
