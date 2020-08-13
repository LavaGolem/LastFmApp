# LastFmApp

Run app locally using: ```expo start``` command

## About: 

App is providing list of Countries, Top artists and info about selected artists available on <b>last.fm</b>

## Notes

- last.fm api images urls are not working so images look like Sherif icon https://www.reddit.com/r/lastfm/comments/bk9syk/lastfm_api_now_returning_invalid_images/
- Country flag is provided as an SVG Url which is almost impossible to render in React Native app, if you don't want to manually load and change SVGs, instead of flag url React Native Emoji library is used
