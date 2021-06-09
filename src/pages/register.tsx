import { Form, Formik } from "formik";
import React, { ReactElement } from "react";

export interface registerProps {}

export default function register(_props: registerProps): ReactElement | null {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <div>Hello</div>
        </Form>
      )}
    </Formik>
  );
}
