import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-test-renderer";
import RegisterPage from "../register-page";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

const mockHttp = jest.fn();
jest.mock("../../../utils/http/request", () => () => mockHttp());

describe("# RegisterPage", () => {
  it("should render initial register page", () => {
    const { getByTestId, getByText } = render(<RegisterPage />);

    expect(getByTestId("register-form")).toBeInTheDocument();
    expect(getByText("Verify")).toBeInTheDocument();
  });

  it("should jump to register step, when verify success", async () => {
    mockHttp.mockImplementation(() =>
      Promise.resolve({
        data: {}
      })
    );
    const { getByTestId, getByText } = render(<RegisterPage />);

    act(() => {
      fireEvent.change(getByTestId("verify-email"), { target: { value: "123@345.com" } });
      fireEvent.click(getByText("Verify"));
    });

    await waitFor(() => {
      expect(getByTestId("user-name")).toBeInTheDocument();
    });
  });

  it("should show error message, when verify failed", async () => {
    mockHttp.mockImplementation(() =>
      Promise.reject(new Error("Error"))
    );
    const { getByTestId, getByText } = render(<RegisterPage />);

    act(() => {
      fireEvent.change(getByTestId("verify-email"), { target: { value: "123@345.com" } });
      fireEvent.click(getByText("Verify"));
    });

    await waitFor(() => {
      expect(getByTestId("verify-error")).toBeInTheDocument();
    });
  });

  it.skip("should loading after click register button", async () => {
    const { getByTestId, getByText } = render(<RegisterPage />);

    act(() => {
      fireEvent.change(getByTestId("user-name"), { target: { value: "123434" } });
      fireEvent.change(getByTestId("password"), { target: { value: "1234" } });
      fireEvent.change(getByTestId("password-confirm"), { target: { value: "1234" } });
      fireEvent.change(getByTestId("email"), { target: { value: "1234@234.com" } });
      fireEvent.change(getByTestId("phone"), { target: { value: "123423" } });

      fireEvent.click(getByTestId("submit-button"));
    });

    await waitFor(() => {
      expect(getByText("Loading")).toBeInTheDocument();
    }, { timeout: 1000000 });
  });

  it.skip("should register success, when validate success", async () => {
    const { getByTestId, getByText } = render(<RegisterPage />);

    act(() => {
      fireEvent.change(getByTestId("user-name"), { target: { value: "123434" } });
      fireEvent.change(getByTestId("password"), { target: { value: "1234" } });
      fireEvent.change(getByTestId("password-confirm"), { target: { value: "1234" } });
      fireEvent.change(getByTestId("email"), { target: { value: "1234@234.com" } });
      fireEvent.change(getByTestId("phone"), { target: { value: "123423" } });

      fireEvent.click(getByTestId("submit-button"));
    });

    await waitFor(() => {
      expect(getByText("注册成功, 为您自动跳转登录页面")).toBeInTheDocument();
    }, { timeout: 1000000 });
  });
});
