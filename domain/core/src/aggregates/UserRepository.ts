import { UserEntity } from '../entities/user';

export type findMany = () => Promise<UserEntity[]>;
export type findById = (id: string) => Promise<UserEntity | undefined>;
