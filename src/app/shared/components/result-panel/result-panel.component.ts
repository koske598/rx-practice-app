import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ResultPanelData {
  isCorrect: boolean | null;
  results: any[];
  expectedOutput?: any[];
  error?: string;
  explanation?: string;
}

@Component({
  selector: 'app-result-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-panel.component.html',
  styleUrl: './result-panel.component.scss'
})
export class ResultPanelComponent {
  @Input() data: ResultPanelData | null = null;
}
