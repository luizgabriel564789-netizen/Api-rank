async function buscar() {
  const id = document.getElementById("userId").value;

  const res = await fetch(`https://api-profile-hykw.vercel.app/api/profile?id=${id}`);
  const data = await res.json();

  document.getElementById("perfil").innerHTML = `
    <img src="${data.avatar}" width="80">
    <h2>${data.nick}</h2>

    <p>💰 ${data.dinheiro}</p>
    <p>🏦 ${data.banco}</p>
    <p>XP: ${data.xp}</p>

    <p>🍗 Fome</p>
    <div class="bar"><div class="fill" style="width:${data.fome.length * 10}%"></div></div>

    <p>💧 Sede</p>
    <div class="bar"><div class="fill" style="width:${data.sede.length * 10}%"></div></div>
  `;
}
