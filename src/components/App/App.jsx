import "./App.css";

import GalleryList from "../GalleryList/GalleryList";
import Header from "../Header/Header";
import AddPhoto from "../AddPhoto/AddPhoto";

function App() {
  return (
    <div
      data-testid="app"
      className="app-div">
      <Header />
      <AddPhoto />
      <GalleryList />
    </div>
  );
}

export default App;
