import { createCanvas, loadImage } from "canvas";

export default async function handler(req, res) {
  const { titulo = "Ranking", nomes = "", valores = "", avatares = "" } = req.query;

  const nomesArr = nomes.split(",");
  const valoresArr = valores.split(",");
  const avataresArr = avatares.split(",");

  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 800, 400);

  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.fillText(titulo, 20, 40);

  for (let i = 0; i < 5; i++) {
    const y = 80 + i * 60;

    ctx.fillStyle = "#222";
    ctx.fillRect(20, y - 30, 760, 50);

    ctx.fillStyle = "#fff";
    ctx.fillText(`#${i + 1}`, 30, y);

    try {
      const avatar = await loadImage(avataresArr[i]);
      ctx.drawImage(avatar, 80, y - 25, 40, 40);
    } catch {}

    ctx.fillText(nomesArr[i] || "User", 140, y);
    ctx.fillText(valoresArr[i] || "0", 650, y);
  }

  res.setHeader("Content-Type", "image/png");
  res.send(canvas.toBuffer());
}
