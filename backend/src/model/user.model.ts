import { IUserResume, IJobInfo } from "../interfaces/UserResume";
import { faker } from "@faker-js/faker";

interface IUserMaps {
  [id: string]: IUserResume;
}

function createFakeUser(id: string): IUserResume {
  const fakeUser: IUserResume = {
    id,
    name: faker.name.fullName(),
    picture: faker.image.avatar(),
    currentCompany: faker.company.name(),
    currentRole: faker.name.jobTitle(),
    previews: [], // Inicialmente, o array de empregos anteriores está vazio
  };

  const numPreviousJobs = faker.datatype.number({ min: 2, max: 5 });
  for (let i = 0; i < numPreviousJobs; i++) {
    const job: IJobInfo = {
      company: faker.company.name(),
      role: faker.name.jobTitle(),
      startedAt: faker.date.past(5),
      finishedAt: faker.date.past(1),
    };

    fakeUser.previews.push(job);
  }

  return fakeUser;
}

const fakeDatabase: IUserMaps = {
  "1": createFakeUser("1"),
  "2": createFakeUser("2"),
  "3": createFakeUser("3"),
  "4": createFakeUser("4"),
  "5": createFakeUser("5"),
};

const listUsers = async (skip: number = 0, limit: number = 10) => {
  const data = Object.values(fakeDatabase);
  return {
    total: data.length,
    skip,
    limit,
    data,
  };
};
const getUser = async (id: string) => {
  return fakeDatabase[id];
};
export { listUsers, getUser };
