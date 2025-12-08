export class Problem {
  isMultiply: boolean;
  terms: number[];

  constructor(operator: string) {
    this.isMultiply = operator === '*';
    this.terms = [];
  }

  solve(): number {
    let ans = this.isMultiply ? 1 : 0;
    for (let term of this.terms) {
      ans = this.isMultiply ? ans * term : ans + term;
    }

    return ans;
  }
}