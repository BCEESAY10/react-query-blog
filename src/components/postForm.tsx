import { Modal, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { type Post } from "../services/postService";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Post) => void;
  initialValues?: Post;
};

export default function PostForm({ visible, onCancel, onSubmit, initialValues }: Props) {
  const [form] = Form.useForm<Post>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Modal
      open={visible}
      title={initialValues ? "Edit Post" : "Create Post"}
      okText={initialValues ? "Update" : "Create"}
      afterClose={() => form.resetFields()}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit(values);
          })
          .catch((info) => {
            console.log("Validation Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
