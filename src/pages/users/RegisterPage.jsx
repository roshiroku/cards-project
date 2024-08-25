import UserModel from "../../models/UserModel";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { jwtDecode } from "jwt-decode";
import SchemaForm from "../../components/forms/SchemaForm";
import RegisterSchema from "../../schema/RegisterSchema";

export default function RegisterPage() {
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const schema = useMemo(() => new RegisterSchema(), []);
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(data => {
    const user = UserModel.fromObject(data);
    user.save().then(() => {
      // UsersAPI.login({ email: user.email, password: user.password }).then(token => {
      //   // save to local storage or something like that homie
      //   console.log(token);
      //   console.log(jwtDecode(token));
      // });
      console.log("registered!");
    });
  }, []);

  return (
    <SchemaForm title="register" {...{ defaultValue, schema, onCancel, onSubmit }} />
  );
}