import { createCanvas, loadImage } from '@napi-rs/canvas'

export default async function handler(req, res) {
  try {
    const nome = req.query.nome || 'Usuário'
    const dinheiro = req.query.reais || '0'
    const avatarUrl = req.query.avatar || 'https://i.imgur.com/0y0y0y0.png'
    const fundo = req.query.fundo || '1'

    const canvas = createCanvas(800, 300)
    const ctx = canvas.getContext('2d')

    // 🔥 FUNDOS
    let background

    if (fundo === '1') {
      background = await loadImage('https://i.imgur.com/8w0bK9X.png')
    } else if (fundo === '2') {
      background = await loadImage('https://i.imgur.com/2g7YQ9G.png')
    } else if (fundo === '3') {
      background = await loadImage('https://i.imgur.com/qV5ZQ0B.png')
    }

    // fallback (NUNCA quebra)
    if (!background) {
      background = await loadImage('https://i.imgur.com/8w0bK9X.png')
    }

    // 🖼️ desenhar fundo
    ctx.drawImage(background, 0, 0, 800, 300)

    // 🧑 AVATAR
    const avatar = await loadImage(avatarUrl)

    ctx.save()
    ctx.beginPath()
    ctx.arc(100, 150, 60, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 40, 90, 120, 120)
    ctx.restore()

    // 👤 NOME
    ctx.fillStyle = '#ffffff'
    ctx.font = '28px sans-serif'
    ctx.fillText(nome, 200, 130)

    // 💰 DINHEIRO
    ctx.fillStyle = '#00ff88'
    ctx.font = '22px sans-serif'
    ctx.fillText(`💰 ${dinheiro} reais`, 200, 180)

    // 📤 resposta
    res.setHeader('Content-Type', 'image/png')
    res.send(canvas.toBuffer('image/png'))

  } catch (err) {
    console.log(err)
    res.status(500).send('Erro na API')
  }
}
