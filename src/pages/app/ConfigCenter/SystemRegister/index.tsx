import { NormalModal, QueryTable } from 'micro-app-lib';
import api from 'api/config-center';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Modal, Upload } from 'antd';
import { useState } from 'react';
const { Dragger } = Upload;
let file: any;
const SytemRegister: React.FC<{}> = () => {
  const allColumns = [
    {
      title: '应用名称',
      dataIndex: 'appName'
    },
    {
      title: '资源路径',
      dataIndex: 'publicPath'
    },
    {
      title: '应用入口',
      dataIndex: 'entry'
    },
    {
      title: '路由',
      dataIndex: 'activeRule'
    },
    {
      title: '部署方式',
      dataIndex: 'deployType'
    },
    {
      title: '操作',
      dataIndex: 'actionX',
      render: (_: any, r: any) => {
        return (
          <>
            <Button type="link" key="edit" onClick={() => editApp(r)}>
              编辑
            </Button>
            <Button type="link" key="delete" onClick={() => deleteApp(r)}>
              删除
            </Button>
          </>
        );
      }
    }
  ];
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [refresh, setRefresh] = useState(false);
  const addApp = () => {
    form.resetFields();
    setVisible(true);
  };

  const editApp = (r: any) => {
    setIsEdit(true);
    setVisible(true);
    setEditData(r);
    form.setFieldsValue(r);
  };

  const deleteApp = (r: any) => {
    Modal.confirm({
      title: '确定删除该菜单吗？',
      onOk() {
        // 接口
        api.deleteApp({ id: r.id }).then((res) => {
          message.success('删除成功！');
          setRefresh((r) => !r);
        });
      }
    });
  };

  const submit = () => {
    form.validateFields().then((values) => {
      if (isEdit) {
        values.id = editData.id;
        api.updateApp(values).then((res) => {
          message.success('编辑成功！');
          setRefresh((r) => !r);
          setVisible(false);
        });
      } else {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('appName', values.appName);
        formData.append('activeRule', values.activeRule);
        formData.append('deployType', values.deployType);
        formData.append('publicPath', values.publicPath);
        formData.append('entry', values.entry);

        api.addApp(formData).then((res) => {
          message.success('添加成功！');
          // setRefresh((r) => !r);
          // setVisible(false);
        });
      }
    });
  };

  return (
    <div className="route-normal-container">
      <div
        className="route-normal-content"
        style={{
          padding: 16
        }}>
        <div
          style={{
            marginBottom: 8
          }}>
          <Button type="primary" onClick={addApp}>
            添加
          </Button>
        </div>
        <QueryTable allColumns={allColumns} dataApi={api.getApp} refresh={refresh} />
      </div>
      <NormalModal
        title={isEdit ? '编辑应用' : '添加应用'}
        visible={visible}
        onOk={submit}
        onCancel={() => {
          setVisible(false);
        }}>
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="应用名称" name="appName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="资源路径" name="publicPath" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="激活路由" name="activeRule" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="应用入口" name="entry" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="部署方式" name="deployType" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="platform">平台部署</Select.Option>
              <Select.Option value="independence">独立部署</Select.Option>
            </Select>
          </Form.Item>
          {/* 上传文件 */}
          <Form.Item label="文件上传" name="file" rules={[{ required: true }]}>
            <Dragger
              multiple={false}
              maxCount={1}
              beforeUpload={(f: any) => {
                file = f
                return false;
              }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">拖拽文件到这里</p>
            </Dragger>
          </Form.Item>
        </Form>
      </NormalModal>
    </div>
  );
};

export default SytemRegister;
