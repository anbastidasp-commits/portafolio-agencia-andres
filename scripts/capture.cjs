/**
 * Captura screenshots reales de las landings (export estático) y las guarda
 * como webp en src/assets/projects/. Sirve cada export en un puerto propio
 * (evita conflictos de puerto) y usa el Chrome del sistema vía puppeteer-core.
 *
 * Uso: node scripts/capture.cjs
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')

const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'

const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'projects')

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain',
}

function serve(root, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let url = decodeURIComponent(req.url.split('?')[0])
      if (url.endsWith('/')) url += 'index.html'
      let file = path.join(root, url)
      if (!file.startsWith(root)) {
        res.writeHead(403)
        return res.end('forbidden')
      }
      fs.stat(file, (err, st) => {
        if (err || st.isDirectory()) {
          // intenta <ruta>.html (Next export limpio)
          const alt = file.replace(/\/?$/, '') + '.html'
          if (fs.existsSync(alt)) file = alt
          else {
            res.writeHead(404)
            return res.end('not found')
          }
        }
        const ext = path.extname(file).toLowerCase()
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
        fs.createReadStream(file).pipe(res)
      })
    })
    server.listen(port, () => resolve(server))
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function scrollDown(page, factor) {
  // Lenis escucha 'wheel' — usamos rueda real (CDP) + fallback scrollTo.
  const vh = page.viewport().height
  const total = Math.round(vh * factor)
  const steps = 14
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel({ deltaY: total / steps })
    await sleep(90)
  }
  await page.evaluate((y) => window.scrollTo(0, y), total).catch(() => {})
  await sleep(1600)
}

const jobs = [
  { out: 'don-pietro', dir: 'E:\\CLAUDE\\don-pietro-pizzeria\\.next-export', port: 5051, hover: { scroll: 1.25 } },
  { out: 'coqui', dir: 'E:\\CLAUDE\\coqui-cafe\\.next-export', port: 5052, hover: { path: '/carta' } },
  { out: 'fontana', dir: 'E:\\CLAUDE\\fontana-lounge\\.next-export', port: 5053, hover: { path: '/carta' } },
  { out: 'cafe-colonial', dir: 'E:\\CLAUDE\\cafe-colonial - copia', port: 5054, hover: { path: '/galeria.html' } },
]

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--hide-scrollbars'],
    defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 },
  })

  for (const job of jobs) {
    const server = await serve(job.dir, job.port)
    const url = `http://localhost:${job.port}/`
    console.log(`\n[${job.out}] serving ${job.dir} -> ${url}`)
    const page = await browser.newPage()
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
      await sleep(5500) // aguanta preloader + hidratación
      const main = path.join(OUT_DIR, `${job.out}-1.webp`)
      await page.screenshot({ path: main, type: 'webp', quality: 82 })
      console.log(`  main  -> ${main}`)

      // Hover: otra página o scroll hacia abajo
      if (job.hover.path) {
        await page.goto(`http://localhost:${job.port}${job.hover.path}`, {
          waitUntil: 'networkidle0',
          timeout: 60000,
        })
        await sleep(4500)
      } else {
        await scrollDown(page, job.hover.scroll)
      }
      const hover = path.join(OUT_DIR, `${job.out}-2.webp`)
      await page.screenshot({ path: hover, type: 'webp', quality: 82 })
      console.log(`  hover -> ${hover}`)
    } catch (e) {
      console.error(`  ERROR [${job.out}]:`, e.message)
    } finally {
      await page.close()
      server.close()
    }
  }

  await browser.close()
  console.log('\nDone.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
