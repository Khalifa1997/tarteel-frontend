
export const commaFormatter = (num: number) => Number(num).toLocaleString()

export const kFormatter = (num: number) => {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num
}
