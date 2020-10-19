import {
  Directive,
  Renderer2,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';

@Directive({
  selector: '[mill-dropzone]'
})
export class DropzoneDirective {
  private static getFileType(filename: string): string {
    return filename && filename.substr(filename.lastIndexOf('.') + 1) || '';
  }

  private readonly _host: HTMLElement;

  /**
   * array: accepted file mime types (ex: Image/Jpeg)
   */
  @Input() acceptedMimeTypes: string[] = [];

  @Output() uploadedFile: EventEmitter<File> = new EventEmitter<File>();

  constructor(public elRef: ElementRef, private _renderer: Renderer2) {
    this._host = elRef.nativeElement;
  }

  @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!this.isFileAllowed(file)) {
      this._renderer.addClass(this._host, 'disabled-dropzone');
      return;
    }
    this._renderer.removeClass(this._host, 'active-dropzone');
    this.uploadedFile.emit(e.dataTransfer.files[0]);
  }

  @HostListener('dragover', ['$event']) onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(e: DragEvent) {
    e.preventDefault();
    this._renderer.removeClass(this._host, 'disabled-dropzone');
    this._renderer.removeClass(this._host, 'dropzone-area');
    this._renderer.addClass(this._host, 'active-dropzone');
  }

  @HostListener('body:dragenter', ['$event']) onBodyDragEnter(e: DragEvent) {
    e.preventDefault();
    this._renderer.addClass(this._host, 'dropzone-area');
  }

  @HostListener('dragleave', ['$event']) onDragLeave(e: DragEvent) {
    e.preventDefault();
    this._renderer.removeClass(this._host, 'active-dropzone');
    this._renderer.removeClass(this._host, 'disabled-dropzone');
  }

  @HostListener('body:dragleave', ['$event']) onBodyDragLeave(e: DragEvent) {
    const target = e.target as HTMLElement;
    e.preventDefault();
    if (!(target === this._host || this._host.contains(target))) {
      this._renderer.removeClass(this._host, 'dropzone-area');
      this._renderer.removeClass(this._host, 'disabled-dropzone');
    }
  }

  private isFileAllowed(file: File): boolean {
    if (!file) {
      return true;
    }

    const type = file.type || DropzoneDirective.getFileType(file.name);
    if (!type) {
      return true;
    }

    if (this.acceptedMimeTypes && this.acceptedMimeTypes.length > 0) {
      const allowedTypes = this.acceptedMimeTypes.map((type) => type.toLowerCase());
      return allowedTypes.includes(type.toLowerCase());
    }

    return true;
  }

}
