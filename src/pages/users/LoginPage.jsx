import User from "../../models/User";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import Joi from "joi";
import SchemaProvider from "../../providers/SchemaProvider";
import SchemaForm from "../../components/forms/SchemaForm";

const schema = {
  email: Joi.string()
    .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: "Please enter a valid mail" })
    .required(),
  password: Joi.string()
    .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    .rule({
      message: "The password must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
    })
    .required(),
};

export default function LoginPage() {
  const defaultValue = useMemo(() => new User().toObject(), []);
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(_ => { }, []);

  return (
    <SchemaProvider rules={schema}>
      <SchemaForm
        title="login"
        labels={User.labels}
        {...{ defaultValue, onCancel, onSubmit }}
      />
    </SchemaProvider>
  );
}