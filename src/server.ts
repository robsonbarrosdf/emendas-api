import { buscarTextoLexmlAsJsonix } from "./services/lexmlJsonixService";
import express from "express";
import cors from "cors";
import {
  buscarProposicao,
  buscarProposicoes,
} from "./services/proposicoesService";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

const router = express.Router();

// rotas
router.get("/", (req, res) => {
  res.send("Serviço Lexml / Jsonix");
});

router.get("/proposicoes", async (req, res) => {
  const proposicoes = await buscarProposicoes(
    req.query.sigla!.toString(),
    req.query.numero?.toString(),
    Number(req.query.ano!)
  );
  res.json(proposicoes);
});

router.get("/proposicao", async (req, res) => {
  const proposicao = await buscarProposicao(
    req.query.sigla!.toString(),
    req.query.numero!.toString(),
    Number(req.query.ano!)
  );
  res.json(proposicao);
});

router.get("/proposicao/texto-lexml/json", async (req, res) => {
  const jsonix = await buscarTextoLexmlAsJsonix(
    req.query.sigla!.toString(),
    req.query.numero!.toString(),
    Number(req.query.ano!)
  );
  res.json(jsonix);
});

app.use(router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
