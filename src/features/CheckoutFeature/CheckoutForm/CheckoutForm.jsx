import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { fetchProvinces } from '~/features/CheckoutFeature/Address/api';

const { Option } = Select;

function CheckoutForm() {
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    fetchProvinces().then((data) => setProvinces(data));
  }, []);
  console.log(provinces);
  return (
    <>
      <Form>
        <Form.Item>
          <Input placeholder="Địa chỉ email" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item>
          <InputNumber
            controls={false}
            placeholder="Số điện thoại"
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item>
          <Select placeholder="Chọn tỉnh thành">
            {provinces?.map((province) => {
              return <Option key={province.code}>{province.name}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Input placeholder="Địa chỉ nhận hàng" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Ghi chú (tùy chọn)" />
        </Form.Item>
      </Form>
    </>
  );
}

export default CheckoutForm;
