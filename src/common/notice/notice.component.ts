import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent {
  @Input() noticeItems: string[];
  @Input() noticeSubTitle: string;

  @Input() link: string;
}
