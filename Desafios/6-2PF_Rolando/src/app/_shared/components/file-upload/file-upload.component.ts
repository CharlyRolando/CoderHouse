import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.css"]
})
export class FileUploadComponent {

  @Input() fileAttr: string = 'Arrastre imagen';
  @Input() tituloBoton: string = '';
  @Output() newItemEvent = new EventEmitter<string>();

  @ViewChild('fileInput') fileInput!: ElementRef;


  uploadFileEvt(imgFile: any) {

    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      this.newItemEvent.emit(this.fileAttr);

      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Arrastre imagen';
    }
  }
}

