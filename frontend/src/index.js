import { createRoot } from 'react-dom/client';
import './App.scss';
import init from './init';

// if (process.env.NODE_ENV !== 'production') {
//   localStorage.debug = 'chat:*';
// }

const render = async () => {
  const vdom = await init();
  const root = createRoot(document.getElementById('root'));

  root.render(vdom);
};

render();
