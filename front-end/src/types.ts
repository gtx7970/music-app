export interface ResModel<T = any> {
  success: boolean
  desc: string | null
  data: T
}
