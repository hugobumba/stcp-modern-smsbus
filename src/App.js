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
        {/* SEARCH ZONE */}
        <div className="w-full lg:w-1/2 flex flex-col items-center p-6">
          <input
            type="text"
            placeholder="Search by name or code..."
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-full flex flex-col sm:flex-row gap-2 mt-4">
            <select className="flex-1 p-3 border rounded-lg">
              <option>Select Line</option>
            </select>
            <select className="flex-1 p-3 border rounded-lg">
              <option>Select Direction</option>
            </select>
            <select className="flex-1 p-3 border rounded-lg">
              <option>Select Stop</option>
            </select>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 gap-2">
            Show Results
          </button>
        </div>

        {/* RESULTS TABLE */}
        <div className="lg:w-1/2 sm:w-full bg-white p-4 mx-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Real-time Bus Arrivals</h2>
          <div className="bg-gray-100 p-3 rounded-lg shadow-sm">

            <div className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">204</span>
              <div>
                <p className="font-semibold">Hospital São João — Aliados</p>
                <p className="text-sm text-gray-500">Via Constituição</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <span className="text-lg font-semibold">3 min</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">204</span>
              <div>
                <p className="font-semibold">Circular Hospital São João</p>
                <p className="text-sm text-gray-500">Via Constituição</p>
              </div>
              <div className="ml-auto flex items-right space-x-2">
                <span className="text-lg font-semibold">1 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto p-4 bg-blue-900 text-white text-center">
        Route 204 temporarily diverted due to road works
      </footer>
    </div>
  );
}

export default App;