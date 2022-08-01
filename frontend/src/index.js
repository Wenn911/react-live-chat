import { createRoot } from 'react-dom/client';
import './App.scss';
import init from './init';

const render = async () => {
  const vdom = await init();
  const root = createRoot(document.getElementById('root'));

  root.render(vdom);
};

render()
