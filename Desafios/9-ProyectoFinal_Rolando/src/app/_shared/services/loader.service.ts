import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  controlLoader!: Subject<boolean>;

  constructor() {
    this.controlLoader = new Subject<boolean>();
  }

  show() {
    this.controlLoader.next(true);
  }

  hide() {
    this.controlLoader.next(false);
  }
}

