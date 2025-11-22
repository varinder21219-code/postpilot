import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class ResumeFormComponent {
  private fb = inject(FormBuilder);
  resumeService = inject(ResumeService);

  openSections = signal<{[key: string]: boolean}>({
    personalDetails: true,
    summary: true,
  });

  resumeForm = this.fb.group({
    personalDetails: this.fb.group({
      fullName: [''],
      jobTitle: [''],
      email: [''],
      phone: [''],
      location: [''],
      website: [''],
    }),
    summary: [''],
    experience: this.fb.array([]),
    education: this.fb.array([]),
    projects: this.fb.array([]),
    skills: this.fb.array([]),
    certifications: this.fb.array([]),
  });

  constructor() {
    const initialData = this.resumeService.resumeData();
    this.resumeForm.patchValue(initialData, { emitEvent: false });
    
    initialData.experience.forEach(exp => this.addExperience(exp));
    initialData.education.forEach(edu => this.addEducation(edu));
    initialData.projects.forEach(proj => this.addProject(proj));
    initialData.skills.forEach(skill => this.addSkill(skill));
    initialData.certifications.forEach(cert => this.addCertification(cert));

    this.resumeForm.valueChanges.subscribe(value => {
      this.resumeService.updateData(value as any);
    });
  }

  get experience() { return this.resumeForm.get('experience') as FormArray; }
  get education() { return this.resumeForm.get('education') as FormArray; }
  get projects() { return this.resumeForm.get('projects') as FormArray; }
  get skills() { return this.resumeForm.get('skills') as FormArray; }
  get certifications() { return this.resumeForm.get('certifications') as FormArray; }

  toggleSection(section: string) {
    this.openSections.update(sections => ({ ...sections, [section]: !sections[section] }));
  }

  // Experience Methods
  addExperience(exp?: any) {
    this.experience.push(this.fb.group({
      company: [exp?.company || ''],
      role: [exp?.role || ''],
      startDate: [exp?.startDate || ''],
      endDate: [exp?.endDate || ''],
      description: [exp?.description || ''],
    }));
  }
  removeExperience(index: number) { this.experience.removeAt(index); }
  
  // Education Methods
  addEducation(edu?: any) {
    this.education.push(this.fb.group({
      institution: [edu?.institution || ''],
      degree: [edu?.degree || ''],
      startDate: [edu?.startDate || ''],
      endDate: [edu?.endDate || ''],
    }));
  }
  removeEducation(index: number) { this.education.removeAt(index); }
  
  // Project Methods
  addProject(proj?: any) {
    this.projects.push(this.fb.group({
      name: [proj?.name || ''],
      description: [proj?.description || ''],
    }));
  }
  removeProject(index: number) { this.projects.removeAt(index); }

  // Skill Methods
  addSkill(skill?: string) {
    this.skills.push(this.fb.control(skill || ''));
  }
  removeSkill(index: number) { this.skills.removeAt(index); }
  
  // Certification Methods
  addCertification(cert?: any) {
    this.certifications.push(this.fb.group({
      name: [cert?.name || ''],
      issuer: [cert?.issuer || ''],
      date: [cert?.date || ''],
    }));
  }
  removeCertification(index: number) { this.certifications.removeAt(index); }

  resetForm() {
    this.resumeService.resetData();
    const initialData = this.resumeService.resumeData();
    
    // Clear FormArrays
    this.experience.clear();
    this.education.clear();
    this.projects.clear();
    this.skills.clear();
    this.certifications.clear();

    this.resumeForm.patchValue(initialData);

    initialData.experience.forEach(exp => this.addExperience(exp));
    initialData.education.forEach(edu => this.addEducation(edu));
    initialData.projects.forEach(proj => this.addProject(proj));
    initialData.skills.forEach(skill => this.addSkill(skill));
    initialData.certifications.forEach(cert => this.addCertification(cert));
  }
}
