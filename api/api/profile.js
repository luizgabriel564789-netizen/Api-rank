import { createCanvas, loadImage } from '@napi-rs/canvas'

export default async function handler(req, res) {
  try {
    const nome = req.query.nome || 'User'
    const avatarUrl = req.query.avatar
    const dinheiro = req.query.reais || 0

    const xp = Number(req.query.xp) || 0
    const xpMax = Number(req.query.xpMax) || 100

    const fome = Number(req.query.fome) || 100
    const sede = Number(req.query.sede) || 100

    const canvas = createCanvas(800, 300)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#1e1e2f'
    ctx.fillRect(0, 0, 800, 300)

    let avatar
    try {
      avatar = await loadImage(avatarUrl)
    } catch {
      avatar = await loadImage('https://i.imgur.com/8w0bK9X.png')
    }

    ctx.save()
    ctx.beginPath()
    ctx.arc(100, 150, 60, 0, Math.PI * 2)
    ctx.clip()
    ctx.drawImage(avatar, 40, 90, 120, 120)
    ctx.restore()

    ctx.fillStyle = '#fff'
    ctx.font = '28px sans-serif'
    ctx.fillText(nome, 200, 80)

    ctx.fillStyle = '#00ff88'
    ctx.font = '22px sans-serif'
    ctx.fillText(`💰 ${dinheiro}`, 200, 110)

    function barra(x, y, largura, altura, valor, max, cor) {
      ctx.fillStyle = '#333'
      ctx.fillRect(x, y, largura, altura)

      const porcentagem = Math.max(0, Math.min(1, valor / max))
      ctx.fillStyle = cor
      ctx.fillRect(x, y, largura * porcentagem, altura)
    }

    ctx.fillStyle = '#fff'
    ctx.fillText('XP', 200, 150)
    barra(200, 160, 400, 15, xp, xpMax, '#5865F2')

    ctx.fillText('🍗 Fome', 200, 200)
    barra(200, 210, 400, 15, fome, 100, '#ff5555')

    ctx.fillText('💧 Sede', 200, 250)
    barra(200, 260, 400, 15, sede, 100, '#55aaff')

    res.setHeader('Content-Type', 'image/png')
    res.send(canvas.toBuffer('image/png'))

  } catch (err) {
    console.log(err)
    res.status(500).send('Erro na API')
  }
}
