import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';

type FileAttach = {
  name: string;
  file?: any;
  state?: 'load' | 'error';
};

enum ListSide {
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

@Component({
  selector: 'mill-file-attach',
  templateUrl: './file-attach.component.html',
  styleUrls: ['./file-attach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileAttachComponent implements OnChanges, AfterViewInit {
  files: FileAttach[] = [];
  side: string;

  @Input() addedFiles: FileAttach[];
  @Input() listSide: ListSide = ListSide.Left;
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listSide && changes.listSide.currentValue) {
      this.setListSide(changes.listSide.currentValue);
    }
    if (changes.addedFiles && changes.addedFiles.currentValue) {
      this.files = changes.addedFiles.currentValue;
      this._cdr.markForCheck();
    }
  }

  ngAfterViewInit() {
    this._cdr.markForCheck();
  }

  chooseFileClick() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileLoaded(event: any) {
    if (event && event.currentTarget) {
      const files = event.currentTarget.files as FileList;
      const singleFile = files.item(0);
      this.files.push({file: singleFile, name: singleFile.name});
    }
  }

  removeFileClick(index: number) {
    this.files.splice(index, 1);
  }

  private setListSide(side: ListSide) {
    switch (side) {
      case ListSide.Left:
        this.side = 'ltr';
        break;
      case ListSide.Right:
        this.side = 'rtl';
        break;
      case ListSide.Bottom:
        this.side = 'bottom';
        break;
      default:
        this.side = 'ltr';
        break;
    }
    this._cdr.markForCheck();
  }

}
