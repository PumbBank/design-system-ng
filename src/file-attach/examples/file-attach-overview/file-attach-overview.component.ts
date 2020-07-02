import { Component, Input } from '@angular/core';
import { FileAttachView } from '../..';

@Component({
  selector: 'file-attach-overview',
  templateUrl: './file-attach-overview.component.html',
  styleUrls: ['./file-attach-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class FileAttachOverviewComponent {
  public files: any[] = [];

  @Input() view: FileAttachView;
  @Input() accepted: string;
  @Input() multiple: boolean;

  constructor() {
    this.generateStabs();
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
