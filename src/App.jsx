import './App.css'
import { Container } from '@mui/material'
import Divider from '@mui/material/Divider';
import Tasks from './Tasks';
function App() {
  

  return (
    <>
      {/* tasks title */}
      <Container style={{textAlign: "center"}} maxWidth="sm">
        
        <Divider>
          <h1>مهامي</h1>
        </Divider>
        
        <Tasks/>
      </Container>

      
    </>
  )
}

export default App
