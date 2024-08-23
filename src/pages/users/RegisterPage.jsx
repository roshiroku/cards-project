import User from "../../models/User";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import ModelForm from "../../components/models/ModelForm";
import UsersAPI from "../../services/UsersAPI";
import { jwtDecode } from "jwt-decode";

export default function RegisterPage() {
  const model = useMemo(() => new User(), []);
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(data => {
    const user = User.fromForm(data);
    UsersAPI.register(user).then(() => {
      UsersAPI.login({ email: user.email, password: user.password }).then(token => {
        // save to local storage or something like that homie
        console.log(token);
        console.log(jwtDecode(token));
      });
    });
  }, []);

  return (
    <ModelForm title="register" {...{ model, onCancel, onSubmit }} />
  );
}