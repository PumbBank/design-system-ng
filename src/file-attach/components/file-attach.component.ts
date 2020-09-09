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
  side: string;

  @Input() addedFiles: FileAttach[];
  @Input() fileAcceptedTypes: string;
  @Input() multiple: boolean;
  @Input() actionCaption: string = 'Обрати';
  @Input() listSide: FileAttachListSide = FileAttachListSide.Left;
  @Output() filesChanged: EventEmitter<FileAttach[]> = new EventEmitter<FileAttach[]>();
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
  }

  ngAfterViewInit(): void {
    this._cdr.markForCheck();
  }

  chooseFileClick(): void {
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
          this.files.push({file: singleFile, name: singleFile.name});
        }
      } else {
        singleFile = files.item(0);
        this.files.push({file: singleFile, name: singleFile.name});
      }
      singleFile = null;
      this.filesChanged.emit(this.files);
      event.currentTarget.value = '';
    }
  }

  removeFileClick(index: number): void {
    this.files.splice(index, 1);
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
        this.side = 'ltr';
        break;
      case FileAttachListSide.Right:
        this.side = 'rtl';
        break;
      case FileAttachListSide.Bottom:
        this.side = 'bottom';
        break;
      default:
        this.side = 'ltr';
        break;
    }
    this._cdr.markForCheck();
  }

}
