import { useState } from "react";
import LinesMap from './linesmap.json';
//import logo from "./logo.svg";
import "./App.css";

function App() {
  const [stopCode, setStopCode] = useState("");
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedSense, setSelectedSense] = useState("");
  const [selectedStop, setSelectedStop] = useState("");
  const [horarios, setHorarios] = useState([]);

  const selectedLineOption = LinesMap.find(line => line.value === selectedLine);
  const selectedSenseOption = selectedLineOption?.senses.find(sense => sense.value === selectedSense);

  const fetchHorarios = async (paragem) => {
    try {
      const response = await fetch(`/horarios?paragem=${paragem}`);
      const data = await response.json();
      console.log(data);
      setHorarios(data);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    }
  };

  const handleSubmitStopCode = async (e) => {
    e.preventDefault();
    await fetchHorarios(stopCode);
  };

  const handleSubmitRoute = async (e) => {
    e.preventDefault();
    await fetchHorarios(selectedStop);
  };

  return (
    <div className="App">

      <header className="bg-white shadow-md p-4 flex justify-between items-center px-6">
        <h1 className="text-xl font-bold">
          <span className="color-stcp-orange">SMS</span>
          <span className="color-stcp-strong-blue">BUS</span>
        </h1>
        <img src="/stcp-logo.png" alt="Logo" className="h-10"/>
      </header>


      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <br />

        <div className="w-full lg:w-2/3 flex flex-col items-center p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4 w-full text-left">Pesquisar Paragem</h2>
          <label className="block text-gray-600 text-sm mb-2 w-full text-left">Código da Paragem:</label>
          <form className="w-full flex flex-col sm:flex-row gap-2" onSubmit={handleSubmitStopCode}>
            <input
              type="text"
              placeholder="Escreva nome ou código da paragem..."
              className="flex-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={stopCode}
              onChange={(e) => setStopCode(e.target.value)}
            />
            <button type="submit" className="px-4 py-3 bg-stcp-strong-blue text-white rounded-md shadow-md hover:bg-blue-600 transition">
              Ver Horários
            </button>
          </form>

          <label className="block text-gray-600 text-sm mt-4 mb-2 w-full text-left">Trajeto:</label>
          <form className="w-full flex flex-col sm:flex-row gap-2" onSubmit={handleSubmitRoute}>

            {/* SELECT DA LINHA */}
            <select className="flex-1 p-3 border rounded-md" onChange={(e) => { setSelectedLine(e.target.value); setSelectedSense(""); }}>
              <option value="">Linha</option>
              {LinesMap.map((line) => (
                <option key={line.value} value={line.value}>
                  {line.name}
                </option>
              ))}
            </select>

            {/* SELECT DO SENTIDO */}
            <select className="flex-1 p-3 border rounded-md" onChange={(e) => setSelectedSense(e.target.value)} disabled={!selectedLine}>
              <option value="">Sentido</option>
              {selectedLineOption?.senses.map((sense) => (
                <option key={sense.value} value={sense.value}>
                  {sense.name}
                </option>
              ))}
            </select>

            {/* SELECT DA PARAGEM */}
            <select className="flex-1 p-3 border rounded-md" onChange={(e) => setSelectedStop(e.target.value)} disabled={!selectedSense}>
              <option value="">Paragem</option>
              {selectedSenseOption?.stops.map((stop) => (
                <option key={stop.value} value={stop.value}>
                  {stop.name}
                </option>
              ))}
            </select>

            <button type="submit" className="bg-stcp-strong-blue text-white px-6 py-3 rounded-md hover:bg-blue-600 gap-2">Ver Horários</button>
          </form>
        </div>

        <br />

        <div id="resultsTable" className="lg:w-2/3 sm:w-full bg-white p-4 mx-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Resultados em tempo real</h2>
          <div className="space-y-4">
            {horarios.length > 0 ? (
              horarios.map((horario, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
                  <div className="flex items-center space-x-3">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">{horario.linha}</span>
                    <div>
                      <p className="font-semibold">{horario.destino}</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold p-2 rounded-md text-center bg-gray-300 text-black">{horario.tempoEstimado}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Faça uma pesquisa para ver os resultados.</p>
            )}
          </div>
        </div>

        <br />

      </div>

      <footer className="mt-auto p-4 bg-stcp-orange text-white text-center">
        Alertas: Route 204 temporarily diverted due to road works
      </footer>
    </div>
  );
}

export default App;
