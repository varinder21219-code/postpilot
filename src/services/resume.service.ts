import { Injectable, signal, effect } from '@angular/core';
import { ResumeData, createInitialResumeData } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private storageKey = 'resumeCraftData';
  
  resumeData = signal<ResumeData>(this.loadFromStorage());

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.resumeData()));
    });
  }

  private loadFromStorage(): ResumeData {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : createInitialResumeData();
  }

  updateData(newData: ResumeData) {
    this.resumeData.set(newData);
  }

  resetData() {
    this.resumeData.set(createInitialResumeData());
    localStorage.removeItem(this.storageKey);
  }
}
