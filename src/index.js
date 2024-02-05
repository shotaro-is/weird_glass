import { createRoot } from 'react-dom/client'
import './styles.css'
import { Experience } from './Experience.js'
import { Leva } from 'leva'

createRoot(document.getElementById('root')).render(
  <>
    <Experience />
    <Leva collapsed />
  </>
)