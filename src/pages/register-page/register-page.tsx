import React from "react";
import LoginRegisterForm from "../../components/login-register-form";
import useRegisterPage from "./hooks/use-register-page";

const RegisterPage: React.FC = () => {
  const {
    loading,
    setEmail,
    setPassword,
    setPhoneNumber,
    setUsername,
    handleRegister
  } = useRegisterPage();
  return (
    <div data-testid="register-form" className="box-border h-1/2 w-1/2 lg:w-1/4 bg-white shadow-lg p-10 text-lg">
      <LoginRegisterForm
        inputClassName="h-10"
        loadingMessage={loading}
        buttonText="立即注册"
        title="注册信息填写"
        setUsername={setUsername}
        setPassword={setPassword}
        setEmail={setEmail}
        setPhoneNumber={setPhoneNumber}
        handleSubmit={handleRegister}
      />
    </div>
  );
};

export default RegisterPage;
