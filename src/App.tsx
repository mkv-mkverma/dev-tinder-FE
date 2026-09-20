import "./App.scss";

function App() {
  return (
    <>
      <h1 className="container">Hi React Dev Tinder FE</h1>
      <div className="bg-blue-500 text-white p-4 rounded-lg">Hello</div>

      {/* daisyUI only - no Tailwind utilities */}
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <div className="badge badge-accent">Accent badge</div>
      <progress className="progress progress-info" value="60" max="100" />
    </>
  );
}

export default App;
