import { Component, Input } from '@angular/core';
import { FileAttachListSide } from '../..';

@Component({
  selector: 'file-attach-overview',
  templateUrl: './file-attach-overview.component.html',
  styleUrls: ['./file-attach-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class FileAttachOverviewComponent {
  public files: any[] = [];

  @Input() listSide: FileAttachListSide;
  @Input() accepted: string;
  @Input() multiple: boolean;

  constructor() {
    this.generateStabs();
  }

  getCaption(listSide: FileAttachListSide) {
    switch (listSide) {
      case FileAttachListSide.Left:
        return 'Left side';
      case FileAttachListSide.Right:
        return 'Right side';
      case FileAttachListSide.Bottom:
        return 'Under the button'

    }
  }

  private generateStabs(): void {
    const files = [];
    for (let i = 0; i < 10; i++) {
      const file = new File(['foo'], `foo_${i + 1}.txt`, {
        type: 'text/plain',
      });
      if (i === 2) {
        files.push({name: file.name, isError: true, file});
      }
      if (i === 3) {
        files.push({name: file.name, isLoading: true, file});
      } else {
        files.push({name: file.name, file});
      }
    }
    this.files = files;
  }
}
