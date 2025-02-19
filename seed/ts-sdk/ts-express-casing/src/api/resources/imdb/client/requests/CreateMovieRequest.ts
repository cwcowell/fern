/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedApi from "../../../../index";

/**
 * @example
 *     {
 *         id: "string",
 *         movieTitle: "string",
 *         movieRating: 1.1
 *     }
 */
export interface CreateMovieRequest {
    id: SeedApi.MovieId;
    movieTitle: string;
    /** The rating scale is one to five stars */
    movieRating: number;
}
