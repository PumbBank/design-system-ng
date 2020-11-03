import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

export type FileAttach = {
  name: string;
  file?: any;
  isError?: boolean;
  isLoading?: boolean;
};

export enum FileAttachListSide {
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export enum FileAttachInputView {
  Button = 'button',
  DropZone = 'drop-zone'
}

@Component({
  selector: 'mill-file-attach',
  templateUrl: './file-attach.component.html',
  styleUrls: ['./file-attach.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FileAttachComponent implements OnChanges, AfterViewInit {
  files: FileAttach[] = [];
  containerSide: string;
  itemSide: string;

  @Input() addedFiles: FileAttach[];
  @Input() fileAcceptedTypes: string;
  @Input() multiple: boolean;
  @Input() disabled: boolean;
  @Input() actionCaption: string = 'Обрати';
  @Input() listSide: FileAttachListSide = FileAttachListSide.Left;
  @Input() inputView: FileAttachInputView = FileAttachInputView.Button;
  @Output() filesChanged: EventEmitter<FileAttach[]> = new EventEmitter<FileAttach[]>();
  @Output() fileDeleted: EventEmitter<{index: number, file: FileAttach}> = new EventEmitter<{index: number, file: FileAttach}>();
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listSide && changes.listSide.currentValue) {
      this.setListSide(changes.listSide.currentValue);
    }
    if (changes.addedFiles && changes.addedFiles.currentValue) {
      this.files = changes.addedFiles.currentValue;
      this._cdr.markForCheck();
    }
    if (changes.inputView && changes.inputView.currentValue === FileAttachInputView.DropZone) {
      this.listSide = FileAttachListSide.Bottom;
      this.setListSide(FileAttachListSide.Bottom);
    }
  }

  ngAfterViewInit(): void {
    this._cdr.markForCheck();
  }

  chooseFileClick(): void {
    if (this.disabled) {
      return;
    }
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileLoaded(event: any): void {
    if (event && event.currentTarget) {
      const files = event.currentTarget.files as FileList;
      let singleFile;
      if (this.multiple && files.length > 1) {
        for (let i = 0; i < files.length; i++) {
          singleFile = files.item(i);
          this.files.unshift({file: singleFile, name: singleFile.name});
        }
      } else {
        singleFile = files.item(0);
        this.files.unshift({file: singleFile, name: singleFile.name});
      }
      singleFile = null;
      this.filesChanged.emit(this.files);
      event.currentTarget.value = '';
    }
  }

  onDroppedFileUploaded(file: File): void {
    this.files.unshift({file, name: file.name});
  }

  removeFileClick(index: number): void {
    const file = this.files[index];
    this.files.splice(index, 1);
    this.fileDeleted.emit({index, file})
  }

  reAttachFileClick(index: number): void {
    this.chooseFileClick();
    const subs = this.filesChanged.subscribe((files: FileAttach[]) => {
      if (!files) {
        return;
      }
      this.files.splice(index, 1);
      subs.unsubscribe();
    });
  }

  textEllipsisCenter(text: string, shrink: number = 10): string {
    if (text.length > 25) {
      const parts = text.split('');
      return `${parts.slice(0, shrink).join('')}...${parts.slice(-shrink).join('')}`;
    }

    return text;
  }

  private setListSide(side: FileAttachListSide): void {
    switch (side) {
      case FileAttachListSide.Left:
        this.containerSide = 'file-attach__container_ltr';
        this.itemSide = 'file-attach__item_ltr';
        break;
      case FileAttachListSide.Right:
        this.containerSide = 'file-attach__container_rtl';
        this.itemSide = 'file-attach__item_rtl';
        break;
      case FileAttachListSide.Bottom:
        this.containerSide = 'file-attach__container_bottom';
        this.itemSide = 'file-attach__item_bottom';
        break;
      default:
        this.containerSide = 'file-attach__container_ltr';
        this.itemSide = 'file-attach__item_ltr';
        break;
    }
    this._cdr.markForCheck();
  }

}
