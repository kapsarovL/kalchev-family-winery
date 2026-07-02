declare module "@testcontainers/postgresql" {
  import { TestContainer } from "testcontainers/build/types";

  export class PostgreSqlContainer extends TestContainer {
    constructor(image?: string);
    getConnectionUri(): string;
    start(): Promise<StartedPostgreSqlContainer>;
  }

  export interface StartedPostgreSqlContainer extends PostgreSqlContainer {
    stop(): Promise<void>;
  }
}
