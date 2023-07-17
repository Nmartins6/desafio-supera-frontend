import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [transferencias, setTransferencias] = useState([]);
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [nomeOperador, setNomeOperador] = useState(null);

  useEffect(() => {
    const params = [];

    if (transferencias.fetching) {
      return;
    }

    if (dataInicio !== null) {
      params.push(`dataInicio=${dataInicio}`);
    }

    if (dataFim !== null) {
      params.push(`dataFim=${dataFim}`);
    }

    if (nomeOperador !== null && nomeOperador.trim() !== "") {
      params.push(`nomeOperador=${nomeOperador}`);
    }

    const url = `http://localhost:8080/transferencias?${params.join("&")}`;

    fetch(url)
      .then((response) => response.json())
      .then((transferencias) => {
        setTransferencias(transferencias);
      });
  }, [dataInicio, dataFim, nomeOperador]);

  return (
    <div className="App">
      <h1>Desafio Supera Java-React</h1>
      <form>
        <div className="SearchFields">
          <label>
            <span>Data de início</span>
            <input
              type="date"
              onChange={(e) => setDataInicio(e.target.value)}
            ></input>
          </label>

          <label>
            <span>Data de fim</span>
            <input
              type="date"
              onChange={(e) => setDataFim(e.target.value)}
            ></input>
          </label>

          <label>
            <span>Nome do operador transacionado</span>
            <input
              type="text"
              onChange={(e) => setNomeOperador(e.target.value)}
            ></input>
          </label>
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Nome do operador transacionado</th>
          </tr>
        </thead>
        <tbody>
          {transferencias.map((t) => {
            const dataFormatada = new Date(t.data).toLocaleDateString('pt-BR');

            const valorNumerico = Number(t.valor);
            const valorFormatado = valorNumerico.toLocaleString('pt-BR', {minimumFractionDigits: 2});
            return (
              <tr key={t.id}>
                <td>{dataFormatada}</td>
                <td>{valorFormatado}</td>
                <td>{t.tipo}</td>
                <td>{t.nomeOperador}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
