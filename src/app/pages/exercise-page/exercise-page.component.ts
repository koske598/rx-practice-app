import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from '../../shared/components/code-editor/code-editor.component';
import { ResultPanelComponent, ResultPanelData } from '../../shared/components/result-panel/result-panel.component';
import { ExerciseNavigationComponent } from '../../shared/components/exercise-navigation/exercise-navigation.component';
import { CodeExecutionService } from '../../shared/services/code-execution.service';
import { Exercise } from '../../shared/models/exercise.model';
import { EXERCISES } from '../../features/exercise/data/exercises.data';

@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [
    CommonModule,
    CodeEditorComponent,
    ResultPanelComponent,
    ExerciseNavigationComponent
  ],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.scss'
})
export class ExercisePageComponent implements OnInit {
  exercises = EXERCISES;
  currentExerciseIndex = 0;
  currentCode = '';
  resultPanelData: ResultPanelData | null = null;

  constructor(private codeExecutionService: CodeExecutionService) {}

  ngOnInit() {
    this.loadExercise();
  }

  get currentExercise(): Exercise {
    return this.exercises[this.currentExerciseIndex];
  }

  loadExercise() {
    this.currentCode = this.currentExercise.initialCode;
    this.resultPanelData = null;
  }

  onCodeChange(code: string) {
    this.currentCode = code;
  }

  runCode() {
    const executionResult = this.codeExecutionService.execute(this.currentCode);
    
    if (executionResult.success) {
      const isCorrect = this.codeExecutionService.checkAnswer(
        executionResult.results,
        this.currentExercise.expectedOutput
      );
      
      this.resultPanelData = {
        isCorrect,
        results: executionResult.results,
        expectedOutput: this.currentExercise.expectedOutput,
        explanation: this.currentExercise.explanation
      };
    } else {
      this.resultPanelData = {
        isCorrect: false,
        results: [],
        error: executionResult.error
      };
    }
  }

  resetExercise() {
    this.loadExercise();
  }

  nextExercise() {
    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex++;
      this.loadExercise();
    }
  }

  previousExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
      this.loadExercise();
    }
  }
}
