export const log = (...data: unknown[]) => {
  const formatedData = data.map((item) => {
    return JSON.stringify(item, undefined, 2)
  })
  console.log(...formatedData)
}
