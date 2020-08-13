import { slice, getArtistInfo } from "./artistInfoSlice";
import axios from "axios";
import { API_KEY } from "../../../env/Config";

jest.mock("axios");

describe("artistsInfoSlice", () => {
  it("testAddArtistInfo", () => {
    const newArtist = {
      data: {
        artist: {
          name: "Eminem",
          mbid: "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
          url: "https://www.last.fm/music/Cher"
        }
      },
      artistName: "Eminem"
    };

    const initialState = {
      artistInfo: {
        Cher: {
          artist: {
            name: "Cher",
            mbid: "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
            url: "https://www.last.fm/music/Cher"
          }
        }
      }, artistInfoError: {}
    };

    const newState = slice.reducer(initialState, slice.actions.addArtistInfo(newArtist));
    const newVar = {
      artistInfo: {
        Eminem: {
          artist: {
            mbid: "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
            name: "Eminem",
            url: "https://www.last.fm/music/Cher"
          }
        },
        Cher: {
          artist: {
            name: "Cher",
            mbid: "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
            url: "https://www.last.fm/music/Cher"
          }
        }
      }, artistInfoError: {}
    };
    expect(newState).toEqual(newVar);
  });
});

describe("artistsInfoApiFetch", () => {
  it("testAddArtistInfo", () => {
    const state = {
      artistInfo: {
        artistInfo: {
          Eminem: {
            artist: {
              name: "Eminem",
              mbid: "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
              url: "https://www.last.fm/music/Cher"
            }
          }
        }, artistInfoError: {}
      }
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(state));

    const dispatch = jest.fn();
    const getState = () => (state);
    getArtistInfo("Cher")(dispatch, getState);

    expect(axios.get).toHaveBeenCalledWith(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=${API_KEY}&format=json`,
      { "headers": { "User-Agent": "LAVA_LAST_FM_API" } }
    );
  });
});
