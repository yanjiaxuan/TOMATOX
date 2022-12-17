import ReactDOM from 'react-dom/client'
import './assets/styles/index.less'
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import { AliveScope } from 'react-activation'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </BrowserRouter>
)
