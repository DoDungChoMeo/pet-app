import 'antd/dist/antd.variable.min.css';
import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});

function AntdProvider({ children }) {
  return <ConfigProvider>{children}</ConfigProvider>;
}

export default AntdProvider;
