import { Helmet } from "react-helmet-async";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div>
      <Helmet>
        <title>Loin - TaskTide</title>
      </Helmet>
      <LoginForm />
    </div>
  );
};

export default Login;
