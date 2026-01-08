// api/index.js
import metrics from "@lowlighter/metrics"
import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer-core"

export default async function handler(req, res) {
  try {
    // Ambil parameter dari query string (URL)
    // Contoh: /api?username=octocat&base=header
    const { username, ...options } = req.query

    // Gunakan token dari environment variable
    const token = process.env.METRICS_TOKEN

    if (!token) {
      return res.status(500).send("Error: METRICS_TOKEN is not set in environment variables.")
    }

    // Konfigurasi default
    const defaultOptions = {
      token: token,
      user: username || "lowlighter", // Default user jika tidak ada parameter
      template: "classic",
      base: "header, activity, community, repositories, metadata",
      config_timezone: "Asia/Jakarta",
    }

    // Merge options: query params akan menimpa default
    // Note: Parameter dari query string semuanya string, beberapa plugin mungkin butuh boolean/number
    // Metrics library biasanya cukup pintar handling ini, tapi hati-hati.
    const finalOptions = { ...defaultOptions, ...options }

    // Generate metrics dengan puppeteer custom
    // Kita harus setup browser secara manual agar jalan di serverless function
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    })

    const result = await metrics(finalOptions, {
      puppeteer: {
        browser: browser
      }
    })

    // Set header agar browser tahu ini gambar SVG
    res.setHeader("Content-Type", "image/svg+xml")
    res.setHeader("Cache-Control", "public, max-age=3600") // Cache 1 jam

    // Kirim hasil
    res.status(200).send(result)

    // Tutup browser
    await browser.close()

  } catch (error) {
    console.error(error)
    // Pastikan browser tertutup jika ada error
    // (Di serverless function context, ini mungkin kurang kritikal karena container mati, tapi good practice)
    res.status(500).json({ error: "Failed to generate metrics", details: error.message })
  }
}
