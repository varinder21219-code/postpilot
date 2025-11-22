import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResumeFormComponent } from '../../components/resume-form/resume-form.component';
import { ResumePreviewComponent } from '../../components/resume-preview/resume-preview.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ResumeFormComponent, ResumePreviewComponent],
})
export class BuilderComponent {
  isDarkMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(savedTheme === 'dark' || (savedTheme === null && prefersDark));
  }

  toggleTheme() {
    this.isDarkMode.update(value => !value);
  }
}
