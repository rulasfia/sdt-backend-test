import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type cities = {
    id: number;
    name: string;
    country_id: number;
};
export type countries = {
    id: number;
    name: string;
    iso_name: string;
};
export type users = {
    id: string;
    first_name: string;
    last_name: string;
    birthday: Timestamp;
    location_address: string;
    location_city_id: number;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type DB = {
    cities: cities;
    countries: countries;
    users: users;
};
