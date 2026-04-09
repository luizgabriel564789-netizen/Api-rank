export default async function handler(req, res) {
  const { titulo = "Ranking", nomes = "", valores = "", avatares = "" } = req.query;

  const nomesArr = nomes.split(",");
  const valoresArr = valores.split(",");
  const avataresArr = avatares.split(",");

  let html = `
  <html>
  <head>
  <style>
    body { background:#111; color:#fff; font-family:Arial; }
    .card { display:flex; align-items:center; margin:10px; padding:10px; background:#222; border-radius:10px; }
    img { width:40px; height:40px; border-radius:50%; margin-right:10px; }
  </style>
  </head>
  <body>
  <h1>${titulo}</h1>
  `;

  for (let i = 0; i < 5; i++) {
    html += `
    <div class="card">
      <span>#${i + 1}</span>
      <img src="${avataresArr[i] || ""}">
      <span>${nomesArr[i] || "User"}</span>
      <span style="margin-left:auto">${valoresArr[i] || "0"}</span>
    </div>
    `;
  }

  html += `</body></html>`;

  res.setHeader("Content-Type", "text/html");
  res.send(html);
}
