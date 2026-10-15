import { runAllSearchModes } from '../src/utils/searchEngine.js';

const testQuery = "wireless headphones";
console.log(`Running test search for: "${testQuery}"\n`);
const result = runAllSearchModes(testQuery, { maxResults: 5 });

console.log('--- Comparison Results ---');
result.comparison.forEach(c => {
  console.log(`${c.mode}:`);
  console.log(`  - Docs Examined: ${c.docsExamined}`);
  console.log(`  - Operations: ${c.operations}`);
  console.log(`  - Time (ms): ${c.timeMs}`);
  console.log(`  - Energy (µJ): ${c.energyMicroJoules}`);
  console.log(`  - Energy Saved: ${c.energySavedPercent}%\n`);
});

console.log(`Linear Top Hit: ${result.linear.results[0]?.document.title}`);
console.log(`Inverted Top Hit: ${result.inverted.results[0]?.document.title}`);
console.log(`Energy-Aware Top Hit: ${result.energyAware.results[0]?.document.title}`);

