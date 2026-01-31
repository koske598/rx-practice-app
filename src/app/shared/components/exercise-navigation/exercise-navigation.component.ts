import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-navigation.component.html',
  styleUrl: './exercise-navigation.component.scss'
})
export class ExerciseNavigationComponent {
  @Input() currentIndex: number = 0;
  @Input() totalExercises: number = 0;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.totalExercises - 1;
  }

  onPrevious() {
    if (this.canGoPrevious) {
      this.previous.emit();
    }
  }

  onNext() {
    if (this.canGoNext) {
      this.next.emit();
    }
  }
}
