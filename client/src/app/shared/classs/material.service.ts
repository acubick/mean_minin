declare var M: any

export class MaterialService {
  static toast(msg: string) {
    M.toast({html: msg})
  }
}
