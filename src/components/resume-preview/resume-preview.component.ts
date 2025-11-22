import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-resume-preview',
  templateUrl: './resume-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumePreviewComponent {
  resumeService = inject(ResumeService);
  resumeData = this.resumeService.resumeData;
  isDownloading = signal<string | null>(null); // 'pdf', 'png', 'jpg'
  isExportMenuOpen = signal(false);

  private async getCanvas(): Promise<HTMLCanvasElement | null> {
    const resumeElement = document.getElementById('resume-preview-content');
    if (!resumeElement) return null;
    return await (window as any).html2canvas(resumeElement, {
      scale: 2.5, // Higher scale for better quality
      useCORS: true,
      backgroundColor: '#ffffff'
    });
  }

  private triggerDownload(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async downloadAsPDF() {
    if (this.isDownloading()) return;
    this.isDownloading.set('pdf');
    this.isExportMenuOpen.set(false);
    const canvas = await this.getCanvas();
    if (canvas) {
      const { jsPDF } = (window as any).jspdf;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('ResumeCraft-Resume.pdf');
    }
    this.isDownloading.set(null);
  }

  async downloadAsPNG() {
    if (this.isDownloading()) return;
    this.isDownloading.set('png');
    this.isExportMenuOpen.set(false);
    const canvas = await this.getCanvas();
    if (canvas) {
      const imgData = canvas.toDataURL('image/png');
      this.triggerDownload(imgData, 'ResumeCraft-Resume.png');
    }
    this.isDownloading.set(null);
  }

  async downloadAsJPG() {
    if (this.isDownloading()) return;
    this.isDownloading.set('jpg');
    this.isExportMenuOpen.set(false);
    const canvas = await this.getCanvas();
    if (canvas) {
      const imgData = canvas.toDataURL('image/jpeg', 0.95); // Quality 95%
      this.triggerDownload(imgData, 'ResumeCraft-Resume.jpg');
    }
    this.isDownloading.set(null);
  }
}
