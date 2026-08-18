import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style.css"
import { PostContextProvider } from './feature/post/post.context.jsx';
createRoot(document.getElementById('root')).render(
   <StrictMode>
    
            <PostContextProvider>
            <App />
        </PostContextProvider>
        
    </StrictMode>
    
)
