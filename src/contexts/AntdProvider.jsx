import 'antd/dist/antd.variable.min.css';
import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#f04336',
  },
});

function AntdProvider({ children }) {
  return <ConfigProvider>{children}</ConfigProvider>;
}

export default AntdProvider;
