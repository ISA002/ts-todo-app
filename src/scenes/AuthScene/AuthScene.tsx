import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Navbar from "./Navbar/Navbar";
import { observer, inject } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import "./AuthScene.scss";

interface AuthSceneProps extends RouteComponentProps {
  authStore: any;
}

const AuthScene = (props: AuthSceneProps) => {
  const [loading, setLoading] = React.useState(false);

  let onChangeFormStateUser = (event: any) => {
    props.authStore.setUsername(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLoading(true);
      props.authStore.login().then(() => {
        props.history.replace("/cabinet");
        setLoading(false);
      });
    }
  };

  let onChangeFormStatePass = (event: any) => {
    props.authStore.setPassword(event.target.value);
  };

  let handleSubmit = () => {
    setLoading(true);
    props.authStore.login().then(() => {
      props.history.replace("/cabinet");
      setLoading(false);
    });
  };

  return (
    <div className="AuthScene">
      <Navbar />
      <div className="AuthScene__form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <div className="AuthScene_img">
            <img src="https://clck.ru/N2upC" alt="Loading..." />
          </div>
          <h2 className="AuthScene_h2">Todo app</h2>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
            className="AuthScene__form_input_username"
          >
            <Input
              value={props.authStore.values.username}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={onChangeFormStateUser}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
            className="AuthScene__form_input_password"
          >
            <Input.Password
              value={props.authStore.values.password}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={onChangeFormStatePass}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="#">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              onClick={handleSubmit}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onKeyDown={onKeyDown}
              loading={loading}
            >
              Log in
            </Button>
            Or <a href="#">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default inject("authStore")(withRouter(observer(AuthScene)));
