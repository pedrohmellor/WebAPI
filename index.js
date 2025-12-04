import "dotenv/config";
import express from "express";
import db from "./db.js"

const app = express();
app.use(express.json());

app.post("/cadastro", async (req, res) =>{
    const custumer = req.body
    await db.createCustumer(custumer);
    res.status(201).json("Cliente cadastrado com sucesso")
})

app.patch("/editar/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const customer = req.body;
  await db.updateCustomer(id, customer);
  res.status(200).json("Cliente editado com sucesso");
});

app.delete("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.deleteCustomer(id);
  res.status(200).json("Cliente excluído com sucesso");
});

app.get("/cliente/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db.selectCustomerById(id);

  if (!result) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  } else {
    res.status(200).json(result);
  }
});

app.get("/clientes", async (req, res) => {
  const results = await db.selectCustumer();
  res.json(results);
});

app.get("/", (req, res) => {
  res.json("Bem-vindo!");
});

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});