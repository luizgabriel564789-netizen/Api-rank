import { createCanvas, loadImage } from '@napi-rs/canvas'

export default async function handler(req, res) {
  try {
    const nome = req.query.nome || 'Usuário'
    const dinheiro = req.query.reais || '0'
    const avatarUrl = req.query.avatar
    const fundo = req.query.fundo || '1'

    const canvas = createCanvas(800, 300)
    const ctx = canvas.getContext('2d')

    let background
    try {
      if (fundo === '1') {
        background = await loadImage('https://i.imgur.com/8w0bK9X.png')
      } else if (fundo === '2') {
        background = await loadImage('https://i.imgur.com/2g7YQ9G.png')
      } else {
        background = await loadImage('https://i.imgur.com/qV5ZQ0B.png')
      }
    } catch {
      background = await loadImage('https://i.imgur.com/8w0bK9X.png')
    }

    ctx.drawImage(background, 0, 0, 800, 300)

    let avatar
    try {
      avatar = await loadImage(avatarUrl)
    } catch {
      avatar = await loadImage('https://i.imgur.com/8w0bK9X.png')
    }

    ctx.save()
    ctx.beginPath()
    ctx.arc(100, 150, 60, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 40, 90, 120, 120)
    ctx.restore()

    ctx.fillStyle = '#ffffff'
    ctx.font = '28px sans-serif'
    ctx.fillText(nome, 200, 130)

    ctx.fillStyle = '#00ff88'
    ctx.font = '22px sans-serif'
    ctx.fillText(`💰 ${dinheiro} reais`, 200, 180)

    res.setHeader('Content-Type', 'image/png')
    res.send(canvas.toBuffer('image/png'))

  } catch (err) {
    console.log(err)
    res.status(500).send('Erro na API')
  }
}
