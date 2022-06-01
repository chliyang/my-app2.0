import { Rule } from "antd/lib/form";

interface ILoginRegisterFormRule {
  userNameRules: Rule[];
  passwordRules: Rule[];
  confirmPasswordRules: Rule[];
  emailRules: Rule[];
  verifyCodeRules: Rule[];
}
export const LoginRegisterFormRules: ILoginRegisterFormRule = {
  userNameRules: [
    { required: true, message: "请输入用户名!" },
    { type: "string", min: 6, message: "用户名长度不小于6" }
  ],
  passwordRules: [{ required: true, message: "请输入密码!" }],
  confirmPasswordRules: [
    {
      required: true,
      message: "请二次确认您的密码"
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("两次输入的密码不一致!"));
      }
    })
  ],
  emailRules: [
    {
      type: "email",
      message: "请输入正确的邮箱地址！"
    },
    {
      required: true,
      message: "请输入邮箱地址！"
    }
  ],
  verifyCodeRules: [
    {
      required: true,
      message: "请输入您的验证码"
    },
    {
      len: 6,
      message: "请输入六位验证码"
    }
  ]
};
