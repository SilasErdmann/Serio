import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vdo-player',
  templateUrl: './vdo-player.component.html',
  styleUrls: ['./vdo-player.component.scss']
})
export class VdoPlayerComponent implements OnInit {
  videoItems = [
    {
      name: 'Video one',
      src: '/assets/img/Rick.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video two',
      src: '/assets/img/Rick.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Video three',
      src: '/assets/img/Rick.mp4',
      type: 'video/mp4'
    }
  ];
    activeIndex = 0;
    currentVideo = this.videoItems[this.activeIndex];
    data: any;
    constructor() { }
    ngOnInit(): void { }
    videoPlayerInit(data: any) {
      this.data = data;
      this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
      this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }
    nextVideo() {
      this.activeIndex++;
      if (this.activeIndex === this.videoItems.length) {
        this.activeIndex = 0;
      }
      this.currentVideo = this.videoItems[this.activeIndex];
    }
    initVdo() {
      this.data.play();
    }
    startPlaylistVdo(item: any, index: number) {
      this.activeIndex = index;      this.currentVideo = item;
    }
}
