//YOUTUBE DATA API v3. Search
//help for params : https://developers.google.com/youtube/v3/docs/search/list#--

import axios from "axios";

// import axios from "axios";

var arrID = [];
var arrTitle = [];
var request = require("request");
var optionParams = {
  q: "happy+joyful music",
  part: "snippet",
  key: "AIzaSyDlkFwFbKkX7bRRReJ28U2xGjGsyrxBZbY",
  type: "video",
  maxResults: 3,
  regionCode: "KR",
  videoDuration: "short",
};

//한글을 검색어로 전달하기 위해선 url encoding 필요!
optionParams.q = encodeURI(optionParams.q);

var url = "https://www.googleapis.com/youtube/v3/search?";
for (var option in optionParams) {
  url += option + "=" + optionParams[option] + "&";
}

// //url의마지막에 붙어있는 & 정리
url = url.substr(0, url.length - 1);

// axios
//   .get("https://www.googleapis.com/youtube/v3/search", optionParams, {
//     headers: {
//       "Content-Type": `application/json`,
//     },
//   })
//   .then((response) => {
//     console.log(response);
//   });
// axios.post("http://localhost:8077/music/recommend",)

request(url, function (err, res, body) {
  //console.log(body);

  //json형식을 서버로 부터 받음
  var data = JSON.parse(body).items;
  var musics = [];
  for (var content in data) {
    //youtube downloader에 videoId 넘기면 됨.
    // console.log(data[content].snippet.title + " : " + data[content].id.videoId);
    // console.log(data[content].snippet.thumbnails);
    arrID[content] = data[content].id.videoId;
    arrTitle[content] = data[content].snippet.title;
    var music = {
      title: data[content].snippet.title,
      youtube_id: data[content].id.videoId,
      description: data[content].snippet.description,
      thumbnail: data[content].snippet.thumbnails.high.url,
    };
    musics.push(music);
    console.log(musics);
  }
  console.log("youtube 1");
  console.log(data);
  axios
    .post("http://localhost:8077/music/recommend", musics)
    .then((response) => {
      localStorage.music = JSON.stringify(response.data);
      console.log(response.data);
    });
  // axios
  //   .post("http://localhost:8077/music/recommend", musics)
  //   .then((response) => {
  //     console.log(response);
  //   });
});

const test = { arrID, arrTitle, optionParams };

export default test;
