import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormProps<T> {
  defaultValues?: Partial<Record<keyof T, unknown>>,
  error?: Partial<Record<keyof T, string>>,
  children: JSX.Element | JSX.Element[],
  onSubmit: SubmitHandler<T>,
  validation: { [key: string]: unknown },
  translation?: string,
}

type DefaultValues<T> = Partial<Record<keyof T, unknown>>;

const Form = <T extends {}>({ defaultValues, children, onSubmit, validation, error, translation }: FormProps<T>) => {
  const methods = useForm({ defaultValues } as DefaultValues<T>);
  const { handleSubmit } = methods;
  const { t } = useTranslation(translation);

  useEffect(() => {
    for(const key in error) {
      methods.setError(key, { message: error[key] });
    }
  }, [error]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {React.Children.map(children, child => {
          const { name } = child.props;
          const { type } = child;

          if(type === "submit") {
            const newProps = { ...child.props, onSubmit: handleSubmit(onSubmit) };
            return React.createElement(child.type, { ...newProps });
          }

          if(name) {
            const error = methods.errors[name] ? methods.errors[name].message : null;
            const newProps = {
              label: t(`form.${name}Label`),
              placeholder: t(`form.${name}Placeholder`),
              ...child.props,
              error,
              ref: methods.register(validation[name]),
              key: name,
            };
            return React.createElement(child.type, { ...newProps });
          } else {
            return child;
          }
        })}
      </form>
    </FormProvider>
  );
};

export default Form;
