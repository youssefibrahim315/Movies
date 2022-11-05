export enum CrudMovies {
    create="create",
    update="update",
    delete="delete",
    list="list",
    moviesByCategory="moviesByCategory"
}
export type CrudMoviesEnum = keyof typeof CrudMovies;
