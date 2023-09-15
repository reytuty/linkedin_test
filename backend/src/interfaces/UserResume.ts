export interface IJobInfo {
  company: string;
  role: string;
  startedAt: Date;
  finishedAt: Date;
}
export interface IUserResume {
  id: string;
  name: string;
  picture: string;
  currentCompany: string;
  currentRole: string;
  previews: IJobInfo[];
}
