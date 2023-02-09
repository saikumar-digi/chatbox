import './App.css';
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Join from "./component/Join/Join.js";
import Chat from './component/Chat/Chat';



function App() {
  
  return (
    <Router>
    <div className="App">
    <Routes>
      <Route path="/" element={<Join/>} />
      <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
