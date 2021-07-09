import {ElementRef} from "@angular/core"

declare var M: any

export class MaterialService {
  static toast(msg: string) {
    M.toast({html: msg})
  }

  static initializeFloatingButton(ref: ElementRef) {
      M.FloatingActionButton.init(ref.nativeElement)
  }


}


