export default function pluralizationPolishRule (choice: number, choicesLength: number, orgRule: any) {
  if (choice === 1) {
    return 1
  }

  const teen = choice > 10 && choice < 20
  if (!teen && choice % 10 > 1 && choice % 10 < 5) {
    return 2
  }

  return 0
}
