import UserModel from "../../models/UserModel";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import Joi from "joi";
import SchemaProvider from "../../providers/SchemaProvider";
import SchemaForm from "../../components/forms/SchemaForm";
import { Box } from "@mui/material";

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
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(_ => { }, []);

  return (
    <Box maxWidth="sm" m="auto" py={2}>
      <SchemaProvider rules={schema}>
        <SchemaForm
          title="login"
          labels={UserModel.labels}
          structure={{ email: { grid: 12, type: "email" }, password: { grid: 12, type: "password" } }}
          {...{ defaultValue, onCancel, onSubmit }}
        />
      </SchemaProvider>
    </Box>
  );
}