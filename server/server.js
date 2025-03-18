import express from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import path from 'path';
import { fileURLToPath } from 'url'; // Importa o método necessário para calcular o diretório

const app = express();
const port = 3000;

// Calcula o __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../build'))); // Serve arquivos estáticos da pasta 'public'

const url = 'https://www.stcp.pt/pt/widget/post.php?uid=d72242190a22274321cacf9eadc7ec5f';

async function getHorarios(paragem) {
    try {
        const response = await fetch(`${url}&paragem=${paragem}`);
        const body = await response.text();
        const $ = cheerio.load(body);

        const horarios = [];
        $('.separa').each((index, element) => {
            const linha = $(element).find('.linhasAssoc li a').text().trim();
            const destino = $(element).find('.Linha2').text().trim();
            const proxima = $(element).find('.Linha4').text().trim();

            horarios.push({
                linha: linha,
                destino: destino,
                proxima: proxima,
            });
        });

        return horarios;

    } catch (error) {
        console.error('Erro ao obter horários:', error);
        return [];
    }
}

// Rota para obter os resultados de horários
app.get('/horarios', async (req, res) => {
    const { paragem } = req.query;
    const horarios = await getHorarios(paragem);
    res.json(horarios);
});

// Rota para servir o index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na http://localhost:${port}`);
});
