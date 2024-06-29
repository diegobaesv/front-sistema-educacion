import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validator-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './validator-form.component.html',
  styleUrl: './validator-form.component.scss'
})
export class ValidatorFormComponent implements OnInit {

  @Input() control?: AbstractControl | null;


  ngOnInit(): void {
  }

  

}
