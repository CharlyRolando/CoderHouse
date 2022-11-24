import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.css"]
})
export class FileUploadComponent {

  @Input() fileAttr: string = 'Arrastre imagen';
  @Input() tituloBoton: string = '';
  @Output() newUploadFileEvent = new EventEmitter<string>();

  @ViewChild('fileInput') fileInput!: ElementRef;

  loading: boolean = false;

  uploadPercent!: Observable<number | undefined>;
  urlImage!: Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) {}


  uploadFileEvt(imgFile: any) {

    this.loading = true;

    if (imgFile.target.files && imgFile.target.files[0]) {

    const id=Math.random().toString(36).substring(2);
    const file = imgFile.target.files[0];
    const filePath = `uploads/image_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent	= task.percentageChanges();

    task.snapshotChanges().pipe(finalize(() => { ref.getDownloadURL().subscribe(
      downloadURL => {
        this.fileAttr = downloadURL;
        this.newUploadFileEvent.emit(this.fileAttr);
        this.loading = false;
        }
      )})).subscribe();

    }
    else {
      this.fileAttr = 'Arrastre imagen';
      this.loading = false;
    }


  }





}

