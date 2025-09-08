// import { css } from '@/assets/newsletterCSS'
import newsletterStyles from '@/assets/newsletter.css?raw'

export function template(contents: string) {
  return /*html*/ `<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Vipassana Anuncios</title>
            <style type="text/css">${newsletterStyles}</style>
        </head>
        <body>
            ${contents}
        </body>
    </html>
  `
}
