import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mill-intro-overview',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss', '../../assets/styles/overview.scss']
})

export class IntroGuidelineComponent {
  builds: {version: string, lib: string, date: string}[]

  constructor(private _http: HttpClient, private _clipboardService: ClipboardService) {
    this._http.get('/CHANGELOG.md', {responseType: 'text'}).toPromise().then((response: string) => {
      const lines = response.split(/\r\n|\r|\n/g).filter(f => f);
      this.builds = lines.filter(f => f.indexOf('##') === -1).map(a => {
        const values = a.split(' - ');
        values[1] = values[1]
          .match(/\[.*\]/)[0]
          .replace(/\[|\]|v/g, '')
          .trim();
        return {
          version: values[1],
          lib: values[0],
          date: values[2]
        };
      });
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
