import { Controller, Post, Body } from '@nestjs/common';

@Controller('execution')
export class ExecutionController {
  @Post('run')
  async runCode(@Body() body: { code: string; language: string; problemId: string; type: 'run' | 'submit' }) {
    // Simulate real sandbox execution delay (Docker/Piston style)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const isSubmit = body.type === 'submit';
    
    // Hardcoded mock response for demo feature 7 & 8
    const mockTests = [
      { hidden: false, input: "[1, 5, 3, 9, 2]", expected: "9", actual: "9", passed: true },
      { hidden: false, input: "[-5, -2, -9]", expected: "-2", actual: "-2", passed: true },
      { hidden: false, input: "[100]", expected: "100", actual: "100", passed: true }
    ];

    if (isSubmit) {
      mockTests.push(
        { hidden: true, input: "HIDDEN_1", expected: "HIDDEN_1_EXPECTED", actual: "HIDDEN_1_EXPECTED", passed: true },
        { hidden: true, input: "HIDDEN_2", expected: "HIDDEN_2_EXPECTED", actual: "WRONG", passed: false }
      );
    }

    const allPassed = mockTests.every(t => t.passed);
    const passedCount = mockTests.filter(t => t.passed).length;

    return {
      status: allPassed ? 'success' : 'failed',
      runtime: '0.42',
      memory: '18',
      passed: passedCount,
      total: mockTests.length,
      tests: mockTests
    };
  }
}
