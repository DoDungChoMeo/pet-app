import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import {
  fetchProvinces,
  fetchDistricts,
} from '~/features/CheckoutFeature/Address/api';

const { Option } = Select;

function CheckoutForm({ form }) {
  // const [provinces, setProvinces] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [provinceCode, setProvinceCode] = useState([]);

  // useEffect(() => {
  //   fetchProvinces().then((data) => setProvinces(data));
  // }, []);
  // useEffect(() => {
  //   fetchDistricts(provinceCode).then((data) => setDistricts(data));
  // }, [provinceCode]);

  return (
    <>
      <Form form={form}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền email',
            },
          ]}
        >
          <Input placeholder="Địa chỉ email" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền họ tên',
            },
          ]}
        >
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền số điện thoại liên lạc',
            },
          ]}
        >
          <Input
            placeholder="Số điện thoại"
          />
        </Form.Item>
        {/* <Form.Item
          name="province"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn tỉnh thành',
            },
          ]}
        >
          <Select placeholder="Chọn tỉnh thành">
            {provinces?.map((province) => {
              return (
                <Option key={province.code} value={province.name}>
                  {province.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item> */}
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: 'Vui lòng điền địa chỉ nhận hàng',
            },
          ]}
        >
          <Input placeholder="Địa chỉ nhận hàng" />
        </Form.Item>
        <Form.Item name="notes">
          <Input placeholder="Ghi chú (tùy chọn)" />
        </Form.Item>
      </Form>
    </>
  );
}

export default CheckoutForm;
