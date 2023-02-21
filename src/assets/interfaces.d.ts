interface AnimeSearch {
  currentPage: string;
  hasNextPage: boolean;
  results: Anime[];
}

interface Anime {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  subOrDub: string;
}

interface AnimeEpisode {
  id: string;
  number: number;
  url: string;
}

interface AnimeDetails {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: AnimeEpisode[];
}

interface AnimeEpisodeDetails {
  headers: {
    Referer: string;
  };
  sources: AnimeEpisodeDetailsSource[];
}

interface AnimeEpisodeDetailsSource {
  url: string;
  isM3U8: boolean;
  quality: string;
}

export {
  Anime,
  AnimeDetails,
  AnimeEpisode,
  AnimeEpisodeDetails,
  AnimeEpisodeDetailsSource,
  AnimeSearch
};
