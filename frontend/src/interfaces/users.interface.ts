export interface IJobInfo {
  company: string;
  role: string;
  startedAt: string;
  finishedAt: string;
}
export interface IUserResume {
  id: string;
  name: string;
  picture: string;
  currentCompany: string;
  currentRole: string;
  previews: IJobInfo[];
}
