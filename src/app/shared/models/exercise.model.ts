export interface Exercise {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: any[];
  explanation: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}
