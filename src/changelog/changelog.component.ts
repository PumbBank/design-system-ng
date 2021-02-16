import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ChipComponent } from '../chips/components/chip/chip.component';
import { HttpClient } from '@angular/common/http';

type ChangelogContent = {
  title: string;
  body: string;
};

type VersionedChangelog = {
  version: string;
  description: string;
  content: ChangelogContent[];
};

@Component({
  selector: 'mill-changelog',
  templateUrl: 'changelog.component.html',
  styleUrls: ['./changelog.component.scss', '../assets/styles/overview.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class ChangelogComponent implements OnInit {
  activeVersion: string;

  @ViewChild('chipAll', {static: true}) chipAll: ChipComponent;
  @ViewChild('chipV7', {static: true}) chipV7: ChipComponent;
  @ViewChild('chipV8', {static: true}) chipV8: ChipComponent;
  @ViewChild('chipV9', {static: true}) chipV9: ChipComponent;
  @ViewChild('chipV10', {static: true}) chipV10: ChipComponent;

  private _changeLogMap: Map<string, VersionedChangelog> = new Map();

  static parseGroups(lines: string[]): any[] {
    const isTitle = (text: string) => text.indexOf('###') > -1;
    const result = [];
    let title = '';
    let content = [];

    for (let i = 0; i < lines.length; i++) {
      if (isTitle(lines[i])) {
        if (title) {
          result.push({title, content});
        }
        title = lines[i].replace(/#/g, '');
        content = [];
      } else {
        content.push(lines[i]);
      }
    }
    if (title) {
      result.push({title, content});
    }
    return result;
  }

  constructor(private _http: HttpClient,
              private _cdr: ChangeDetectorRef) {
    this.getChangeLogs();
  }

  ngOnInit(): void {
    this.activeVersion = 'All';
    this.updateClass(this.chipAll, true);
  }

  showVersion(version: string): void {
    if (this.activeVersion) {
      this.updateClass(this[`chip${this.activeVersion}`], false);
    }
    this.updateClass(this[`chip${version}`], true);
    this.activeVersion = version;
  }

  getChangesForVersion(version: string): VersionedChangelog {
    return this._changeLogMap.get(version);
  }

  getChanges(): any[] {
    return [...this._changeLogMap.entries()].map(m => m[1]);
  }

  private updateClass(chip: ChipComponent, isActive: boolean): void {
    chip.hostClass = isActive ? 'mill-chip chip_active' : 'mill-chip';
  }

  private getChangeLogs(): void {
    Promise.all([
      this.getVersionedChangeLog('7'),
      this.getVersionedChangeLog('8'),
      this.getVersionedChangeLog('9'),
      this.getVersionedChangeLog('10')
    ])
      .then(() => {
        this._cdr.markForCheck();
      })
      .catch(console.error);
  }

  private getVersionedChangeLog(version: string): Promise<any> {
    return this._http.get(`/CHANGELOG_NG${version}.md`, {responseType: 'text'}).toPromise().then((response: string) => {
      const lines = response.split(/\r\n|\r|\n/g).filter(f => f);
      this._changeLogMap.set(`V${version}`, this.parseContent(lines));
    });
  }

  private parseContent(raw: string[]): VersionedChangelog {
    const rawContent = raw.slice(2);
    return {
      version: raw[0].replace('##', ''),
      description: raw[1],
      content: ChangelogComponent.parseGroups(rawContent)
    };
  }

}
