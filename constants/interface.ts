export interface baseEntity {
  id?: number
  createdAt?: string
  updatedAt?: string
}

export interface IUser extends baseEntity {
  email: string
  name: string
  phoneNumber?: string

  avatar?: string
}

export interface IPagination {
  page?: number
  size?: number
  sort?: string[]
}

export interface IDevice extends baseEntity {
  name: string
  image: string
  tokens?: IToken[]
}

export interface IApplication extends baseEntity {
  name: string
  image: string
}

export interface IToken extends baseEntity {
  token: string
}
