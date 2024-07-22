import logo from './logo.svg';
import './App.css';
import {DocViewer} from './components/docViewer/docViewer';
import { FileContextProvider } from './helpers/fileHandler';
import { useContext } from 'react';
function App() {
  return (
      <FileContextProvider>
        <DocViewer></DocViewer>
      </FileContextProvider>
  );
}

export default App;
