import express from 'express';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const PORT = process.env.PORT || 3001;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://www.stcp.pt/pt/widget/post.php?uid=d72242190a22274321cacf9eadc7ec5f';

app.use(cors());
app.use(express.static(path.join(__dirname, '../interface/build')));

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

            // Separar a hora e o tempo estimado
            let horaEsperada = "";
            let tempoEstimado = "";

            if (proxima.includes(" - ")) {
                [horaEsperada, tempoEstimado] = proxima.split(" - ");
            }

            if (linha || destino || horaEsperada || tempoEstimado) {
                horarios.push({
                    linha,
                    destino,
                    horaEsperada,
                    tempoEstimado,
                });
            }
        });


        return horarios;

    } catch (error) {
        console.error('Erro ao obter horários:', error);
        return [];
    }
}

app.get('/horarios', async (req, res) => {
    const { paragem } = req.query;
    const horarios = await getHorarios(paragem);
    res.json(horarios);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../interface/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
});
