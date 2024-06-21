import { template } from './template'
import he from 'he'
import juice from 'juice'
import { crush } from 'html-crush'

export async function build(contents: string) {
  let html = template(contents)

  // Cache html tag
  const htmlRegExp = /<html.*?>/
  const htmlTag = html.match(htmlRegExp)![0]

  html = validateLinks(html)
  html = encodeHtmlEntities(html)
  html = inlineCSS(html)
  html = autocloseTags(html)
  // Replace styled html tag for old one,
  // effectively removing the style attr
  html = html.replace(htmlRegExp, htmlTag)

  const webPretty = extractMainTable(html)

  const email = await minify(html)
  const web = await minify(webPretty)

  const now = new Date()
  const baseName = `ARG_${now.getUTCFullYear()}_${now.getUTCMonth()}`

  try {
    download(email, baseName + '.email.html')
    download(web, baseName + '.web.html')
  } catch (error) {
    console.error('Failed to download files:', error)
  }
}

function validateLinks(html: string): string {
  const dataArr = html.split('<body>')
  dataArr[0] += '<body>'
  dataArr[1] = dataArr[1].replaceAll(/(http:\/\/|https:\/\/www\.)/g, 'https://')

  return dataArr.join('')
}

function encodeHtmlEntities(html: string): string {
  return he.encode(html, {
    allowUnsafeSymbols: true
  })
}

function inlineCSS(html: string): string | undefined {
  return juice(html, {
    removeStyleTags: false
  })
}

function autocloseTags(html: string): string {
  const tags = ['br', 'img', 'meta', 'hr']
  for (const tag of tags) {
    const pattern = new RegExp(`(<${tag}.*?)(/?>)`, 'g')
    html = html.replaceAll(pattern, '$1/>')
  }
  return html
}

async function minify(html: string): Promise<string> {
  return crush(html, {
    removeLineBreaks: true,
    removeHTMLComments: true,
    breakToTheLeftOf: [],
    mindTheInlineTags: []
  }).result
}

function extractMainTable(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  const table = div.querySelector('#u_body')
  // div.querySelector('.footer')!.remove()

  return table!.outerHTML
}

function download(html: string, name: string) {
  const element = document.createElement('a')
  const file = new Blob([html], { type: 'html/plain' })
  element.href = URL.createObjectURL(file)
  element.download = name

  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}
