//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      {/* HEADER */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center px-6">
        <h1 className="text-xl font-bold text-blue-600">SMS BUS</h1>
        <p>LOGO</p>
      </header>

      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      
      <br></br>

        {/* SEARCH ZONE */}
        <div className="w-full lg:w-2/3 flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 w-full text-left">Pesquisar Paragem</h2>
          <label className="block text-gray-600 text-sm mb-2 w-full text-left">Código da Paragem:</label>
          <input
            type="text"
            placeholder="Escreva nome ou código da paragem..."
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block text-gray-600 text-sm mt-4 mb-2 w-full text-left">Trajeto:</label>
          <div className="w-full flex flex-col sm:flex-row gap-2">
            <select className="flex-1 p-3 border rounded-lg">
              <option>Linha</option>
            </select>
            <select className="flex-1 p-3 border rounded-lg">
              <option>Sentido</option>
            </select>
            <select className="flex-1 p-3 border rounded-lg">
              <option>Paragem</option>
            </select>
          </div>
          <button className="w-1/2 mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 gap-2">
            Ver Horários
          </button>
        </div>

        <br></br>

        {/* RESULTS TABLE */}
        <div className="lg:w-2/3 sm:w-full bg-white p-4 mx-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Resultados em tempo real</h2>

          <div className="space-y-4">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-500 text-white text-white px-3 py-1 rounded-md text-sm">204</span>
                  <div>
                    <p className="font-semibold">Hospital São João — Aliados</p>
                    <p className="text-sm text-gray-500">Via Constituição</p>
                  </div>
                </div>
                <span className="text-lg font-semibold p-2 rounded-lg text-center bg-gray-300 text-black">3 min</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto p-4 bg-blue-900 text-white text-center">
        Alertas: Route 204 temporarily diverted due to road works
      </footer>
    </div>
  );
}

export default App;

