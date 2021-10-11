export interface ResModel<T = any> {
  success: boolean
  desc: string | null
  data: T
}

export interface Song {
  album: string
  duration: number
  id: number
  mid: string
  name: string
  pic: string
  singer: string
  url: string
}
