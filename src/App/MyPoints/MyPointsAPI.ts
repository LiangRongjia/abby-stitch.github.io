const baseUrl = 'https://liangrongjia.github.io/abby-stitch.github.io/db'

export const fetchDB: () => Promise<{
  semesters: {
    ID: string,
    name: string,
    order: number
  }[],
  grades: {
    name: string,
    points: number
  }[],
  classes: {
    semester: string,
    grades: string,
    credits: number,
    name: string
  }[]
}>
  = () => fetch(`${baseUrl}/my-points.json`).then(response => response.json())