import React, { useState } from 'react';
import { Radio } from 'antd';

function PaymentMethod() {
  const [value, setValue] = useState('cod');

  return (
    <div style={{ marginBottom: '20px' }}>
      <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
        <Radio value={'cod'}>{'Thanh toán trực tiếp (COD)'}</Radio>
        {/* <Radio value={'momo'}>Momo</Radio> */}
      </Radio.Group>
    </div>
  );
}

export default PaymentMethod;
