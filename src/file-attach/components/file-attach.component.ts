import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges, Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

export type FileAttach = {
  name: string;
  file?: any;
  isError?: boolean;
};

export enum ListSide {
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export enum FileAttachView {
  Ghost = 'ghost',
  Hidden = 'hidden'
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

  @Input() view: FileAttachView = FileAttachView.Ghost;
  @Input() addedFiles: FileAttach[];
  @Input() fileAcceptedTypes: string;
  @Input() listSide: ListSide = ListSide.Left;
  @Output() filesChanged: EventEmitter<FileAttach[]> = new EventEmitter<FileAttach[]>();
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
      this.filesChanged.emit(this.files);
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
