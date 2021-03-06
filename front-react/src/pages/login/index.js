import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { Form, Input, Button, Card, Alert } from "antd";
import api from "../../services/api";
import { Redirect } from "react-router-dom";

const { Content } = Layout;

// Form layout props
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

// Card tabs
const tabList = [
  {
    key: "login",
    tab: "Login",
  },
  {
    key: "register",
    tab: "Register",
  },
];

export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [key, setKey] = useState("login");
  const [loading, setLoading] = useState(false);
  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form Fields
  const nameField = (
    <Form.Item
      label="Name"
      name="name"
      rules={[{ required: true, message: "Please input your name!" }]}
    >
      <Input
        defaultValue={name}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </Form.Item>
  );

  const emailField = (
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your email!" }]}
    >
      <Input
        defaultValue={email}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </Form.Item>
  );

  const passwordField = (
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
      ]}
    >
      <Input.Password
        defaultValue={password}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </Form.Item>
  );

  // Card Content
  const contentList = {
    login: (
      <Form
        {...layout}
        name="login"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          console.log(values);
          setLoading(true);
          api
            .post("authenticate", values)
            .then((res) => {
              setLoading(false);
              localStorage.setItem("token", res.data.token);
              setRedirect(true);
            })
            .catch((err) => {
              setLoading(false);
              setAlertMessage("Email/Password invalid");
              setAlertType("error");
              setShowAlert(true);
            });
        }}
        // onFinishFailed={onFinishFailed}
      >
        {emailField}
        {passwordField}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    ),
    register: (
      <Form
        {...layout}
        name="register"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          console.log(values);
          setLoading(true);
          api
            .post("register", values)
            .then((res) => {
              setLoading(false);
              setShowAlert(true);
              setAlertMessage(
                "User registered with success! You may now login your account."
              );
              setAlertType("success");
            })
            .catch((err) => {
              setLoading(false);
            });
        }}
        // onFinishFailed={onFinishFailed}
      >
        {nameField}
        {emailField}
        {passwordField}

        <Form.Item {...tailLayout}>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    ),
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
      <Layout>
        <Content>
          <Row align={"middle"} justify={"center"} style={{ marginTop: "15%" }}>
            <Col span={16}>
              <Card
                hoverable
                tabList={tabList}
                onTabChange={(key) => {
                  setKey(key);
                }}
              >
                {showAlert ? (
                  <Alert
                    showIcon
                    message={alertMessage}
                    type={alertType}
                    style={{ marginBottom: "20px" }}
                    afterClose={() => {
                      setShowAlert(false);
                    }}
                    closable
                  />
                ) : null}
                {contentList[key]}
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
