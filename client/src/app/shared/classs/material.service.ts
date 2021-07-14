import {ElementRef} from "@angular/core"

declare var M: any

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}

export interface MaterialDatepicker extends MaterialInstance{
  date?: Date
}

export class MaterialService {
  static toast(msg: string) {
    M.toast({html: msg})
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef | undefined): MaterialInstance   {
    // @ts-ignore
    return M.Modal.init(ref.nativeElement)
  }
  static initTooltip(ref: ElementRef): MaterialInstance{
    return M.Tooltip.init(ref.nativeElement)
  }

  static initDatePicker(ref: ElementRef, onClose: () => void): MaterialDatepicker{
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    })
  }

}


