import fs from 'fs'
import path from 'path'

import { LlamaParseReader } from '@llamaindex/cloud'

const LLAMAINDEX_API_KEY = 'llx-TfCvcDLkbfoFTtp4RFHQDrAoaRbxSLSr2W2S1V0uTTMiFoI1'

const main = async () => {
  const reader = new LlamaParseReader({
    apiKey: LLAMAINDEX_API_KEY,
    resultType: 'markdown'
  })

  const rawDataDir = path.resolve(process.cwd(), 'app/api/search/data/raw');
  const pdfFiles = fs.readdirSync(rawDataDir).
    filter(file => file.toLowerCase().endsWith('.pdf'))

  const promises = pdfFiles.map(async (file) => {
    const documents = await reader.loadData(path.join(rawDataDir, file))
    const text = documents.map(doc => doc.text).join('\n\n')
    fs.writeFileSync(
      path.join(__dirname, 'data', 'parsed', `${file.replace('.pdf', '.md')}`),
      text)
  })
  await Promise.all(promises)
}

main()
