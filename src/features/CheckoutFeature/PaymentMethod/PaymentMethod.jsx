import React, { useState } from 'react';
import { Radio, Form } from 'antd';

function PaymentMethod({ form }) {
  // const [value, setValue] = useState('cod');

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form form={form}>
        <Form.Item
          name="paymentMethod"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn phương thức thanh toán',
            },
          ]}
        >
          <Radio.Group>
            <Radio value={'cod'}>
              {'Thanh toán trực tiếp khi nhận hàng (COD)'}
            </Radio>
            {/* <Radio value={'momo'}>Momo</Radio> */}
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PaymentMethod;
