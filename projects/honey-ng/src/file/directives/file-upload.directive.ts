import { Directive, ElementRef, Renderer2, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FileUploadEvent } from '../models/file-upload.event';

@Directive({
  selector: '[hnFileUpload]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUploadDirective),
    multi: true
  }]
})
export class FileUploadDirective implements OnInit, ControlValueAccessor {
  private rootElement: HTMLElement;
  private inputFile: HTMLInputElement;

  private fileUpload: FileUploadEvent = { accept: null, uploadedFiles: [] };

  @Input('hnFileUploadAccept') hnAccept: string;

  @Output('hnFileUpload')
  fileAplodEvent: EventEmitter<FileUploadEvent> = new EventEmitter<FileUploadEvent>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.rootElement = this.elementRef.nativeElement;

    this.createDom();
    this.watchClick();
    this.watchSelectFile();
  }

  writeValue(value: any): void {
    if (!value && typeof value.name !== 'string') {
      return;
    }

    this.fileUpload.accept = this.hnAccept;
    this.fileUpload.uploadedFiles.push(value);
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  private onChange: Function = () => { };
  private onTouched: Function = () => { };

  private createDom() {
    this.inputFile = this.renderer.createElement('input');
    this.renderer.setAttribute(this.inputFile, 'type', 'file');
    this.renderer.setAttribute(this.inputFile, 'accept', this.hnAccept);

    this.renderer.setStyle(this.inputFile, 'display', 'none');

    this.renderer.appendChild(this.rootElement, this.inputFile);
  }

  private watchClick() {
    this.rootElement.addEventListener('click', () => {
      this.inputFile.click();
    });
  }

  private watchSelectFile() {
    this.inputFile.addEventListener('change', (e) => {

      this.fileUpload.accept = this.hnAccept;
      this.fileUpload.uploadedFiles = [];
      this.fileUpload.uploadedFiles.push(this.inputFile.files[0]);

      this.onChange(this.fileUpload);
      this.fileAplodEvent.next(this.fileUpload);
    });
  }
}
