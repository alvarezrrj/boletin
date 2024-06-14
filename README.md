# Boletin

## Upload img to WP

Usar en el boletín la versión que tenga mas de 600px de ancho

### Request

```bash
curl \
--user "boletin-builder:$WP_PASS" \
https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/media?alt_text=alice \
--data-binary @/path/to/file.png \
-H 'Content-Disposition: attachment; filename=alice_in_mordor.png' \
-H 'Content-Type: image/png'
```

### Response

```js
{
  "id": 3983,
  "date": "2024-06-03T13:30:39",
  "date_gmt": "2024-06-03T16:30:39",
  "guid": {
    "rendered": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor.png",
    "raw": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor.png"
  },
  "modified": "2024-06-03T13:30:39",
  "modified_gmt": "2024-06-03T16:30:39",
  "slug": "alice_in_mordor",
  "status": "inherit",
  "type": "attachment",
  "link": "https://wordpress-1007166-3876412.cloudwaysapps.com/alice_in_mordor/",
  "title": {
    "raw": "alice_in_mordor",
    "rendered": "alice_in_mordor"
  },
  "author": 4,
  "featured_media": 0,
  "comment_status": "",
  "ping_status": "closed",
  "template": "",
  "meta": [],
  "permalink_template": "https://wordpress-1007166-3876412.cloudwaysapps.com/?attachment_id=3983",
  "generated_slug": "alice_in_mordor",
  "description": {
    "raw": "",
    "rendered": "<p class=\"attachment\"><a href='https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor.png'><img fetchpriority=\"high\" decoding=\"async\" width=\"300\" height=\"172\" src=\"https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-300x172.png\" class=\"attachment-medium size-medium\" alt=\"alice\" srcset=\"https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-300x172.png 300w, https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-1024x585.png 1024w, https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-768x439.png 768w, https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor.png 1067w\" sizes=\"(max-width: 300px) 100vw, 300px\" /></a></p>\n"
  },
  "caption": {
    "raw": "",
    "rendered": ""
  },
  "alt_text": "alice",
  "media_type": "image",
  "mime_type": "image/png",
  "media_details": {
    "width": 1067,
    "height": 610,
    "file": "alice_in_mordor.png",
    "filesize": 1045170,
    "sizes": {
      "medium": {
        "file": "alice_in_mordor-300x172.png",
        "width": 300,
        "height": 172,
        "filesize": 92344,
        "mime_type": "image/png",
        "source_url": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-300x172.png"
      },
      "large": {
        "file": "alice_in_mordor-1024x585.png",
        "width": 1024,
        "height": 585,
        "filesize": 876033,
        "mime_type": "image/png",
        "source_url": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-1024x585.png"
      },
      "thumbnail": {
        "file": "alice_in_mordor-150x150.png",
        "width": 150,
        "height": 150,
        "filesize": 42327,
        "mime_type": "image/png",
        "source_url": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-150x150.png"
      },
      "medium_large": {
        "file": "alice_in_mordor-768x439.png",
        "width": 768,
        "height": 439,
        "filesize": 526785,
        "mime_type": "image/png",
        "source_url": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor-768x439.png"
      },
      "full": {
        "file": "alice_in_mordor.png",
        "width": 1067,
        "height": 610,
        "mime_type": "image/png",
        "source_url": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor.png"
      }
    },
    "image_meta": {
      "aperture": "0",
      "credit": "",
      "camera": "",
      "caption": "",
      "created_timestamp": "0",
      "copyright": "",
      "focal_length": "0",
      "iso": "0",
      "shutter_speed": "0",
      "title": "",
      "orientation": "0",
      "keywords": []
    }
  },
  "post": null,
  "source_url": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-content/uploads/alice_in_mordor.png",
  "missing_image_sizes": [],
  "_links": {
    "self": [
      {
        "href": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/media/3983"
      }
    ],
    "collection": [
      {
        "href": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/media"
      }
    ],
    "about": [
      {
        "href": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/types/attachment"
      }
    ],
    "author": [
      {
        "embeddable": true,
        "href": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/users/4"
      }
    ],
    "replies": [
      {
        "embeddable": true,
        "href": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/comments?post=3983"
      }
    ],
    "wp:action-unfiltered-html": [
      {
        "href": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/media/3983"
      }
    ],
    "wp:action-assign-author": [
      {
        "href": "https://wordpress-1007166-3876412.cloudwaysapps.com/wp-json/wp/v2/media/3983"
      }
    ],
    "curies": [
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  }
}

```
