export interface baseEntity {
  id?: number
  createdAt?: string
  updatedAt?: string
}

export interface IUser extends baseEntity {
  email: string
  name: string
  image?: string
}

export interface IPagination {
  page?: number
  size?: number
  sort?: string[]
}

export interface IDevice extends baseEntity {
  name?: string
  image?: string
  token: string
  applications?: IApplication[]
}

export interface IApplication {
  id: number
  name: string
  image?: string
  package?: string
  usages?: IUsage[]
}

export interface IUsage extends baseEntity {
  dayOfWeek: string
  totalTimeInForeground: number
}

export interface IToken extends baseEntity {
  token: string
}

export interface IWeeklyUsage {
  [key: string]: number
}

export interface IRule extends baseEntity {
  application: IApplication
  startTime: string
  endTime: string
  enabled: boolean
}
