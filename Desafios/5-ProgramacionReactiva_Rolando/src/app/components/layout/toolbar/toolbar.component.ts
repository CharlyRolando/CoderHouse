import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sidebarToggle(): void{
     this.toggleSidebar.emit();
  }


}
