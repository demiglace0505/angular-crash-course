import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public personForm!: FormGroup;
  public countries: string[] = ['USA', 'Japan', 'Philippines'];

  ngOnInit() {
    this.personForm = new FormGroup({
      firstName: new FormControl('Doge', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      lastName: new FormControl('egod'),
      email: new FormControl('doge@doge.com'),
      gender: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        country: new FormControl(),
      }),
    });
  }

  handleSubmit() {
    console.log(this.personForm.valid);
    console.log(this.personForm.value);
  }
}
