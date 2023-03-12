export enum ExpLevel {
  NoExp = 'no_exp',
  LessThanOne = 'less_than_one',
  OnePlus = 'one_plus',
  TwoPlus = 'two_plus',
  ThreePlus = 'three_plus',
  FourPlus = 'four_plus',
  FivePlus = 'five_plus',
}
export enum EmploymentType {
  FullTime = 'full_time',
  PartTime = 'part_time',
  SelfEmployed = 'self_employed',
  Freelance = 'freelance',
  Contract = 'contract',
  Internship = 'internship',
  Apprenticeship = 'apprenticeship',
  Seasonal = 'seasonal',
}
export enum CompanySize {
  OnePlus = 'one_plus',
  NinePlus = 'nine_plus',
  TwentyFivePlus = 'twenty_five_plus',
  OneHundredPlus = 'one_hundred_plus',
  FiveHundredPlus = 'five_hundred_plus',
  OneThoudsandPlus = 'one_thousand_plus',
  TenThoudsandPlus = 'ten_thousand_plus',
}
export interface baseEntity {
  createdAt: string
  updatedAt: string
}

export interface IEducation {
  id?: number
  school: string
  isCompleted?: boolean
  degree?: string
  grade?: string
  description?: string
  startTime: string
  endTime?: string | null
  fieldOfStudy: string
}
export interface IEducationResponse extends baseEntity {}
export interface IUser {
  id: number
  email: string
  name: string
  role: string
  gender?: string
  birthDay?: string
  height?: number
  weight?: number
  level?: ExpLevel
  highSchool?: string
  familyRegisterNumber?: string
  identityCardNumber?: string
  hobby?: string
  character?: string
  placeOfOrigin?: string
  description?: string
  educations: IEducation[]
  skills: IUserSkill[]
  appliedJobs: IApplyJob[]
  favoriteJobs: IFavoriteJob[]
  experiences: IExperienceGetMe[]
  employmentType?: EmploymentType[]
  careersId: number[]
  phoneNumber?: string
  careers?: ICareer[]
  avatar?: string
}
export interface IExperienceGetMe {
  id: number
  title: string
  startDate: string
  endDate: string
  description: string
  employmentType: string
  company: ICompany
  career: ICareer
}
export interface ICompany {
  id: number
  avatar?: string
  name: string
  phone: string
  email: string
  taxNumber: string
  website?: string
  size?: CompanySize
  description?: string
  address?: string
  gpsLat: number
  gpsLng: number
  provinceId: number
  industry?: IIndustry
}
export interface IExperienceCreate {
  title: string
  id?: number
  company_id: number
  career_id: number
  employment_type: EmploymentType
  start_date: string
  end_date?: string
  description?: string
}
export interface IJob {
  id: number
  title: string
  description: string
  location: string
  gpsLat: number
  gpsLng: number
  minSalary: number
  maxSalary: number
  startDate: string
  endDate: string
  employmentType: EmploymentType[]
  workplaces: IWorkplace[]
  company: ICompany
  skills: ISkill[]
  applies: number
  level: ExpLevel
  career: ICareer
  recruits: number
}

export interface ICareer {
  id: number
  name: string
  parent?: ICareer
  industry: IIndustry
}
export interface IIndustry {
  id: number
  name: string
}
export interface IUserSkill {
  userId?: number
  certificate?: string
  skill: ISkill
  description?: string
}
export interface ISkill {
  id: number
  name: string
  description?: string
}
export interface IExperience {
  id: number
  company?: ICompany
  career?: ICareer
  employmentType: EmploymentType
  startDate: string
  endDate?: string
  description?: string
}

export interface IFavoriteJob {
  id: number
  jobId: number
  userId: number
  job: IJob
}
export interface IPagination {
  page?: number
  size?: number
  sort?: string[]
}

export enum IWorkplace {
  OnSite = 'on_site',
  Remote = 'remote',
  Hybrid = 'hybrid',
}

export interface IApplyJob {
  id: number
  jobID: number
  userID: number
  job: IJob
}

export interface ISearchJob extends IPagination {
  careers?: number[]
  lat: number
  lng: number
  range: number
  levels: ExpLevel[]
  jobTypes: EmploymentType[]
  startSalary?: number
  endSalary?: number
}
