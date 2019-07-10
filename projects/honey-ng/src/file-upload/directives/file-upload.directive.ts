import { Directive, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { FileUploadEvent } from '../models/file-upload.event';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[hnFileUpload]'
})
export class FileUploadDirective implements OnInit, OnDestroy {
  private rootElement: HTMLElement;
  private inputFile: HTMLInputElement;

  private _document?: Document;

  @Input('hnFileUploadAccept') accept: string;

  @Output('hnFileUpload')
  fileAplodEvent: EventEmitter<FileUploadEvent> = new EventEmitter<FileUploadEvent>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document?: any
  ) {
    this._document = document as Document;
  }

  ngOnInit() {
    this.rootElement = this.elementRef.nativeElement;

    this.createDom();
    this.watchClick();
    this.watchSelectFile();
  }

  ngOnDestroy() {
    this.renderer.removeChild(this._document.body, this.inputFile);
  }

  private createDom() {
    this.inputFile = this.renderer.createElement('input');
    this.renderer.setAttribute(this.inputFile, 'type', 'file');
    this.renderer.setAttribute(this.inputFile, 'accept', this.accept);

    this.renderer.setStyle(this.inputFile, 'display', 'none');

    this.renderer.appendChild(this._document.body, this.inputFile);
  }

  private watchClick() {
    this.rootElement.addEventListener('click', () => {
      this.inputFile.click();
    });
  }

  private watchSelectFile() {
    this.inputFile.addEventListener('change', (e) => {

      const fileUpload: FileUploadEvent = { files: [] };
      fileUpload.files.push(this.inputFile.files[0]);

      this.fileAplodEvent.next(fileUpload);
    });
  }
}
