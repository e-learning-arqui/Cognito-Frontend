import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Hls from 'hls.js';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})
export class ViewStreamComponent implements AfterViewInit, OnInit {
  
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  hlsUrl!: string;
  hls!: Hls;
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private streamService: StreamService) {}

  ngOnInit(): void {
    // Suponiendo que el id del curso es 1, cambia esto según sea necesario.
    const courseId = this.route.snapshot.params['id'];

    this.streamService.getPlayback(courseId).subscribe({
      next: (apiResponse) => {
        if (apiResponse.response) {
          this.hlsUrl = apiResponse.response;
          this.initializeVideoPlayer();
        }
      },
      error: (error) => console.error('Error fetching playback URL:', error)
    });
  }

  ngAfterViewInit() {
    // La inicialización del reproductor se moverá a un método separado.
  }

  private initializeVideoPlayer() {
    // Esta función ahora inicializará el reproductor de video.
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(this.hlsUrl);
      this.hls.attachMedia(this.videoElement.nativeElement);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoElement.nativeElement.play();
      });
    } else if (this.videoElement.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoElement.nativeElement.src = this.hlsUrl;
      this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
        this.videoElement.nativeElement.play();
      });
    }
  }
}
