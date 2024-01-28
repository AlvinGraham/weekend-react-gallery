function App() {
  return (
    <div data-testid="app">
      <header>
        <h1>React Gallery</h1>
      </header>

      <p>The gallery goes here!</p>
      <img src="images/goat_small.jpg" />
      <img
        src="images/DwarfRanger.jpg"
        width="100px"
        height="100px"
      />
    </div>
  );
}

export default App;
