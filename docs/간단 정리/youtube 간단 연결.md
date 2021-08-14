# youtube 관련 정보 받기

## 엑세스 토큰 받기

### 인가 코드 받기

```
https://accounts.google.com/o/oauth2/auth
```

request
```
https://accounts.google.com/o/oauth2/auth?
  client_id={client_id}&
  redirect_uri=http://localhost:8080/oauth2callback&
  scope=https://www.googleapis.com/auth/youtube&
  response_type=code&
  access_type=offline
```

response
```
http://{redirect uri}code={인가 code 정보}
```

### 엑세스 토큰 요청

request
```
POST /o/oauth2/token HTTP/1.1
Host: accounts.google.com
Content-Type: application/x-www-form-urlencoded

code={인가 code}
client_id={client_id}&
client_secret={client_secret}&
redirect_uri=http://localhost/oauth2callback&
grant_type=authorization_code
```

response
```json
{
  "access_token" : "{access_token}",
  "token_type" : "Bearer",
  "expires_in" : 3600,
  "refresh_token" : "{refresh_token}"
}
```

## youtube playlist 목록

request
```json
GET https://www.googleapis.com/youtube/v3/playlists

필수 매개변수
{
    "part": "id,snippet,status",
    "mine": "true"
}
```

response
```json
{
  "kind": "youtube#playlistListResponse",
  "etag": "QnhTkEwW-PDNY16aAO0fBWyfiyk",
  "pageInfo": {
    "totalResults": 5,
    "resultsPerPage": 5
  },
  "items": [
    {
      "kind": "youtube#playlist",
      "etag": "rp8OzZQcfDH8H0X6dv9P6xMriZI",
      "id": "PLKoYnF1HLQ5hrS03G2sQIYjQ7fUsUh55C",
      "snippet": {
        "publishedAt": "2020-10-13T02:21:44Z",
        "channelId": "UCydfbXJoPT2dAAdNd6kbLWw",
        "title": "요즘",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/AprV9JFmXYA/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/AprV9JFmXYA/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/AprV9JFmXYA/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/AprV9JFmXYA/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/AprV9JFmXYA/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "최기현",
        "localized": {
          "title": "요즘",
          "description": ""
        }
      },
      "status": {
        "privacyStatus": "private"
      }
    },
    {
      "kind": "youtube#playlist",
      "etag": "t0cxnhPeJpjJmm9UWWLaU8Hfl7Y",
      "id": "PLKoYnF1HLQ5jhMPUqCR0IRgf87mdUj8Rq",
      "snippet": {
        "publishedAt": "2019-10-06T02:09:17Z",
        "channelId": "UCydfbXJoPT2dAAdNd6kbLWw",
        "title": "OST",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/9tB9Kgkdx5I/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/9tB9Kgkdx5I/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/9tB9Kgkdx5I/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/9tB9Kgkdx5I/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/9tB9Kgkdx5I/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "최기현",
        "localized": {
          "title": "OST",
          "description": ""
        }
      },
      "status": {
        "privacyStatus": "public"
      }
    },
    {
      "kind": "youtube#playlist",
      "etag": "s1j-8jgyCnCR7k__1uXsNz-Phl4",
      "id": "PLKoYnF1HLQ5gW5DPfWI8erSG-MfjEJE2k",
      "snippet": {
        "publishedAt": "2019-07-30T04:13:04Z",
        "channelId": "UCydfbXJoPT2dAAdNd6kbLWw",
        "title": "기리기리",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/veRIGU--tec/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/veRIGU--tec/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/veRIGU--tec/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/veRIGU--tec/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/veRIGU--tec/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "최기현",
        "localized": {
          "title": "기리기리",
          "description": ""
        }
      },
      "status": {
        "privacyStatus": "public"
      }
    },
    {
      "kind": "youtube#playlist",
      "etag": "C2q6s8eOO1OYdyafU04B8aSvcjo",
      "id": "PLKoYnF1HLQ5gI-7ebEQjoBb4BxChaY7fx",
      "snippet": {
        "publishedAt": "2019-07-11T02:35:23Z",
        "channelId": "UCydfbXJoPT2dAAdNd6kbLWw",
        "title": "일하면서 듣는 노래",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/IweuqB1_hB8/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/IweuqB1_hB8/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/IweuqB1_hB8/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/IweuqB1_hB8/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/IweuqB1_hB8/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "최기현",
        "localized": {
          "title": "일하면서 듣는 노래",
          "description": ""
        }
      },
      "status": {
        "privacyStatus": "public"
      }
    },
    {
      "kind": "youtube#playlist",
      "etag": "POeiuw-ZkYdtAC1ikzlxdeJeABI",
      "id": "PLKoYnF1HLQ5jlT-lZceG66WT3I1tR3_zH",
      "snippet": {
        "publishedAt": "2017-06-21T00:16:39Z",
        "channelId": "UCydfbXJoPT2dAAdNd6kbLWw",
        "title": "j.Fra",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/VD1vuQJFvvY/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/VD1vuQJFvvY/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/VD1vuQJFvvY/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/VD1vuQJFvvY/sddefault.jpg",
            "width": 640,
            "height": 480
          },
          "maxres": {
            "url": "https://i.ytimg.com/vi/VD1vuQJFvvY/maxresdefault.jpg",
            "width": 1280,
            "height": 720
          }
        },
        "channelTitle": "최기현",
        "localized": {
          "title": "j.Fra",
          "description": ""
        }
      },
      "status": {
        "privacyStatus": "public"
      }
    }
  ]
}
```

