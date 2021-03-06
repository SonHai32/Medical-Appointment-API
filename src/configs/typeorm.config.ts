export = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "hhsh06070302",
  database: "ql_dat_lich_kham_benh",
  synchronize: true,
  logging: false,
  entities: ["../entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "../entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
