// Optimize Cloudinary delivery without changing the original URL stored in the API.
export const optimizeImage = (source: string, width: number): string => {
  try {
    const url = new URL(source)
    if (url.hostname !== 'res.cloudinary.com') return source

    // Only transform ordinary, unsigned image uploads.
    const match = url.pathname.match(/^(\/[^/]+\/image\/upload\/)(v\d+\/.*)$/)
    if (!match) return source

    url.pathname = `${match[1]}f_auto,q_auto,c_limit,w_${width}/${match[2]}`
    return url.toString()
  } catch {
    return source
  }
}

export const courseImageSizes = '(max-width: 600px) calc(100vw - 82px), (max-width: 900px) calc((100vw - 152px) / 2), (max-width: 1100px) calc((100vw - 214px) / 3), (max-width: 1200px) calc((100vw - 338px) / 5), 173px'

export const courseImageSrcSet = (source: string): string | undefined => {
  if (optimizeImage(source, 320) === source) return undefined
  return [200, 320, 480, 640, 960, 1200]
    .map((width) => `${optimizeImage(source, width)} ${width}w`)
    .join(', ')
}
