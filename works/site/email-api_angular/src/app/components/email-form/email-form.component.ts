import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  standalone: false,
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  emailForm: FormGroup;

  @Output() submitForm = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      from: ['', [Validators.required, Validators.email]],
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.submitForm.emit(this.emailForm.value);
      this.emailForm.reset();
    }
  }
}
