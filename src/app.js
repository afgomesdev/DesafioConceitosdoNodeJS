const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repo);

  return response.json(repo);

});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const pos = repositories.findIndex(repositorie => repositorie.id === id);

  if (pos < 0) { return response.status(400).json("Repositorie not found") };

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[pos].likes
  };

  repositories[pos] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const pos = repositories.findIndex(repositorie => repositorie.id === id);

  if (pos < 0) { return response.status(400).json("Repositorie not found") };

  repositories.splice(pos, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const pos = repositories.findIndex(repositorie => repositorie.id === id);

  if (pos < 0) { return response.status(400).json("Repositorie not found") };

  repositories[pos].likes = repositories[pos].likes + 1
  
  return response.json(repositories[pos])
});

module.exports = app;
