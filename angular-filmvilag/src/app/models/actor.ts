export type Actors = {
    page:          number;
    results:       Actor[];
    total_pages:   number;
    total_results: number;
}

export type Actor = {
    adult:                boolean;
    gender:               number;
    id:                   number;
    known_for:            KnownFor[];
    known_for_department: KnownForDepartment;
    name:                 string;
    popularity:           number;
    profile_path:         string;
}

export type ActorDeteils = {
    adult:                boolean;
    also_known_as:        string[];
    biography:            string;
    birthday:             Date;
    deathday:             null;
    gender:               number;
    homepage:             null;
    id:                   number;
    imdb_id:              string;
    known_for_department: string;
    name:                 string;
    place_of_birth:       string;
    popularity:           number;
    profile_path:         string;
}


export type KnownFor = {
    adult?:            boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    id:                number;
    media_type:        MediaType;
    original_language: OriginalLanguage;
    original_title?:   string;
    overview:          string;
    poster_path:       string;
    release_date?:     Date;
    title?:            string;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    first_air_date?:   Date;
    name?:             string;
    origin_country?:   string[];
    original_name?:    string;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

export enum OriginalLanguage {
    En = "en",
    It = "it",
    Ko = "ko",
    Tl = "tl",
}

export enum KnownForDepartment {
    Acting = "Acting",
    Directing = "Directing",
}

export type ResultForActorCredits = {
    cast: Cast[];
    crew: Crew[];
    id:   number;
}

export type Cast = {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title?:   string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date?:     string;
    title?:            string;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    character:         string;
    credit_id:         string;
    order?:            number;
    media_type:        MediaType;
    origin_country?:   OriginCountry[];
    original_name?:    string;
    first_air_date?:   Date;
    name?:             string;
    episode_count?:    number;
}

export type Crew = {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    credit_id:         string;
    department:        string;
    job:               string;
    media_type:        MediaType;
}

export enum OriginCountry {
    GB = "GB",
    Us = "US",
}