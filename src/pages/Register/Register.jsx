import { Helmet } from "react-helmet-async";
import RegisterForm from "../../components/RegisterForm";

const Register = () => {
  return (
    <div>
      <Helmet>
        <title>Register - TaskTide</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
};

export default Register;
