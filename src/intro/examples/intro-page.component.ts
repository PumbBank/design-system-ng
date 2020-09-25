import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mill-intro-overview',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})

export class IntroGuidelineComponent {
  public whatsNew: {title: string, content: string}[];
  buildVersion7: string = '0.7.1';
  buildVersion8: string = '0.8.1';
  buildVersion9: string = '0.9.10';
  buildVersion10: string = '0.10.13';

  private static parseGroups(lines: string[]): {title: string, content: string}[] {
    const isTitle = (text: string) => text.indexOf('####') > -1;
    const result = [];
    for (let i = 0; i < lines.length; i++) {
      if (isTitle(lines[i])) {
        const title = lines[i];
        const lineContent = [];
        for (let j = i; j < lines.length; j++) {
          const nextLine = lines[++j];
          if (isTitle(nextLine)) {
            break;
          }
          lineContent.push(nextLine);
        }
        result.push({title, content: lineContent.join('\n')});
      }
    }

    return result.map(m => {
      return {
        title: m.title.replace(/#/g, ''),
        content: m.content
      };
    });
  }

  constructor(private _http: HttpClient, private _clipboardService: ClipboardService) {
    this._http.get('/CHANGELOG.md', {responseType: 'text'}).toPromise().then((response: string) => {
      const lines = response.split(/\r\n|\r|\n/g).filter(f => f);
      this.whatsNew = IntroGuidelineComponent.parseGroups(lines);
    }).catch(console.error);
  }

  copyVersion(text: string): void {
    const confirmMessage = document.createElement('div');
    const confirmMessageIcon = document.createElement('div');
    const copiedText = `npm i @mill/ng@${text}`;

    this._clipboardService.copyFromContent(copiedText);

    confirmMessageIcon.classList.add('copy-popup__icon', 'icon', 'icon_24', 'icon_check');
    confirmMessage.innerHTML = `Скопійовано: npm i @mill/ng@'${text}`;
    confirmMessage.classList.add('copy-popup', 'p2');
    confirmMessage.insertBefore(confirmMessageIcon, confirmMessage.firstChild);
    document.body.appendChild(confirmMessage);

    setTimeout(() => {
      document.body.removeChild(confirmMessage);
    }, 5000);
  }
}
