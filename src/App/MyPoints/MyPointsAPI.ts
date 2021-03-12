const baseUrl = 'https://liangrongjia.github.io/abby-stitch.github.io/db'

export interface SemesterType {
  ID: string,
  name: string,
  order: number
}
export interface GradesType {
  name: string,
  points: number
}
export interface ClassItemType {
  semester: string,
  grades: string,
  credits: number,
  name: string
}
export interface DataStruct {
  semesters: SemesterType[],
  grades: GradesType[],
  classes: ClassItemType[]
}

export const fetchDB: () => Promise<DataStruct> = () => fetch(`${baseUrl}/my-points.json`).then(response => response.json())