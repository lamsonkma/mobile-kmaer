import { EmploymentType } from '../constants/interface'

export function enumToObject(e: any): { name: string; value: string }[] {
  return Object.keys(e).map((name) => {
    return {
      name,
      value: e[name as keyof typeof e],
    }
  })
}

// export function getValueEnum(e: any):Map {
//   const typeLevel = new Map()
//   Object.keys(e).map((name) => {
//     typeLevel.set(e[name as keyof typeof e], name)
//   })
//   return typeLevel
// }
