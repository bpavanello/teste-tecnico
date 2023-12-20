import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.sass'
})
export class DropDownComponent implements OnInit{

  @Input() options: Array<string> = [];
  @Output() selectedOption = new EventEmitter<string>();

  public selectedText: string = 'Options';

  public visible: boolean = false;

  ngOnInit(): void {
    if (this.options.length > 0) {
      this.selectedText = this.options[0]; 
    }
  }

  public toggleOptions(): void {
    this.visible = !this.visible;
  }

  public selectOption(option: string): void {
    this.toggleOptions();
    this.selectedText = option;
    this.selectedOption.emit(this.selectedText);
  }

}
