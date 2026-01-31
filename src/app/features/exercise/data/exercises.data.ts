import { Exercise } from '../../../shared/models/exercise.model';

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: '基礎：データの加工',
    description: '1から5までの数字を10倍にして出力してください。',
    initialCode: `// 下記の results 配列に結果を push してください
// 使用可能: of, map, filter, etc...

of(1, 2, 3, 4, 5).pipe(
  map(x => x * 10)
).subscribe(val => results.push(val));`,
    expectedOutput: [10, 20, 30, 40, 50],
    explanation: 'RxJSの基本フロー（生成 -> 変換 -> 購読）の形です。',
    difficulty: 'beginner'
  },
  {
    id: 2,
    title: '基礎：フィルタリング',
    description: '1から10までの数字から偶数だけを抽出してください。',
    initialCode: `// 偶数だけを抽出してください
of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [2, 4, 6, 8, 10],
    explanation: 'filterオペレーターを使って条件に合う値だけを通過させます。',
    difficulty: 'beginner'
  },
  {
    id: 3,
    title: '基礎：複数の変換',
    description: '1から5までの数字を2倍にして、さらに3より大きい値だけを抽出してください。',
    initialCode: `// 2倍にして、3より大きい値だけを抽出
of(1, 2, 3, 4, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [4, 6, 8, 10],
    explanation: 'pipe内で複数のオペレーターをチェーンできます。',
    difficulty: 'beginner'
  },
  {
    id: 4,
    title: '中級：非同期処理',
    description: '1から3までの数字を、それぞれ1秒遅延させて順番に出力してください。',
    initialCode: `// delayオペレーターを使って非同期処理を実装
of(1, 2, 3).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 2, 3],
    explanation: 'delayオペレーターで非同期処理を実現できます。実際の実行では順番に出力されます。',
    difficulty: 'intermediate'
  },
  {
    id: 5,
    title: '中級：エラーハンドリング',
    description: '1から5までの数字を処理し、3の場合はエラーを発生させ、catchErrorで0に置き換えてください。',
    initialCode: `// エラーハンドリングを実装
of(1, 2, 3, 4, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 2, 0, 4, 5],
    explanation: 'catchErrorオペレーターでエラーをキャッチし、代替値を返すことができます。',
    difficulty: 'intermediate'
  }
];
