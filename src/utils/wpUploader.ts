const MIN_EMAIL_WIDTH = 600
const WIDTH_REDUCTION_STEP = 100

export async function uploadRequest(
  baseUrl: string,
  altText: string,
  basicAuth: string,
  file: File
) {
  return fetch(baseUrl + '/wp-json/wp/v2/media' + `?alt_text=${altText}`, {
    headers: {
      'Content-Disposition': `attachment; filename=${file.name}`,
      'Content-Type': file.type,
      Authorization: `Basic ${basicAuth}`
    },
    method: 'POST',
    body: await file.arrayBuffer()
  })
}

export function extractSizes(wpResponse: WpResponse): Image | null {
  const sizes = wpResponse.media_details.sizes
  if (!sizes) return null

  const thumbnail = sizes.thumbnail.source_url
  const email = findEmailImage(Object.values(sizes)).source_url

  return { thumbnail, email }
}

// Find smallest image of width >= 600px
function findEmailImage(
  images: MediaSize[],
  minWidth = MIN_EMAIL_WIDTH
): MediaSize {
  const found = images
    .sort((a, b) => a.width - b.width)
    .find((s) => s.width >= minWidth)

  // Baseline: return smallest image
  if (!found && minWidth === 0) return images[0]

  return found || findEmailImage(images, minWidth - WIDTH_REDUCTION_STEP)
}

export type Image = {
  thumbnail: string
  email: string
}

export type WpResponse = {
  id: number
  date: string // ISO 8601
  date_gmt: string // ISO 8601
  modified: string // ISO 8601
  modified_gmt: string // ISO 8601
  slug: string
  status: string
  type: string
  link: string
  title: {
    raw: string
    rendered: string
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  template: string
  meta: []
  permalink_template: string
  generated_slug: string
  alt_text: string
  media_type: string
  mime_type: string
  media_details: MediaDetails
  post: null
  source_url: string
  missing_image_sizes: []
}

type MediaDetails = {
  width: number
  height: number
  file: string
  filesize: number
  sizes: {
    medium: MediaSize
    large: MediaSize
    thumbnail: MediaSize
    medium_large: MediaSize
    full: MediaSize
  }
  image_meta: ImageMeta
}

type MediaSize = {
  file: string
  width: number
  height: number
  filesize: number
  mime_type: string
  source_url: string
}

type ImageMeta = {
  aperture: string
  credit: string
  camera: string
  caption: string
  created_timestamp: string
  copyright: string
  focal_length: string
  iso: string
  shutter_speed: string
  title: string
  orientation: string
  keywords: string[]
}
