import './App.css'
import { Container } from '@mui/material'
import Divider from '@mui/material/Divider';
import Tasks from './Tasks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function App() {

  const theme = createTheme({
    status: {
      typography: {
        fontFamily: ["Alex"]
      }
    }
  })

  return (
    <>
    <ThemeProvider theme={theme} >
      {/* tasks title */}
      <Container style={{textAlign: "center"}} maxWidth="sm">
        
        <Divider>
          <h1>مهامي</h1>
        </Divider>
        
        <Tasks/>
      </Container>
    </ThemeProvider>
      
    </>
  )
}

export default App
