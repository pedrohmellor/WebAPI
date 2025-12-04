import mysql from "mysql2/promise";

//fazendo a conexão com o banco
const client = mysql.createPool(process.env.CONNECTION_STRING)

async function selectCustumer(){
    const results = await client.query("SELECT * FROM clientes")
    return results[0];
}

async function selectCustumersById(id){
    const results = await client.query("SELECT * FROM clientes WHERE id=?", id)
    return results[0];
}

async function createCustumer(custumer){
    const values = [custumer.nome, custumer.idade, custumer.telefone]
    await client.query("INSERT INTO clientes(nome, idade, telefone) VALUES (?, ?, ?)", values)
}

async function updateCustomer(id, customerData) {
  const values = [customerData.nome, customerData.idade, customerData.telefone, id];
  await client.query("UPDATE clientes SET nome = ?, idade = ?, telefone = ? WHERE id = ?", values);
}

async function deleteCustomer(id) {
  await client.query("DELETE FROM clientes WHERE id = ?", [id]);
}

export default{
    selectCustumer,
    selectCustumersById,
    createCustumer,
    updateCustomer,
    deleteCustomer
}