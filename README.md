# Hugo Gallery Theme

A very simple and opinionated photo gallery theme for Hugo.

- [Demo](https://nicokaiser.github.io/hugo-theme-gallery/)
- [Example site source](https://github.com/nicokaiser/hugo-theme-gallery/tree/main/exampleSite)

---

![Screenshot](https://github.com/nicokaiser/hugo-theme-gallery/raw/main/images/screenshot.jpg)

---

## TODOs
- [ ] Add `sold_out` (Boolean) functionality
    - Refs.
        - <https://gohugo.io/functions/images/filter/#image-filters>
            - <https://gohugo.io/functions/images/text/>
        - <https://gohugo.io/content-management/image-processing/>
- Karaoke
    - [ ] Remove age verification for karaoke users
    - ethicality
        - [ ] \(\# of columns\) of a table should vary according to whether
              the user is using a smartphone or a laptop to view the page,
              portrait or landscape view, etc.
        - [ ] Table entries get overlapped. Maybe font should depend on screen size?
    - Functions
        - `karaoke-by-keyword.html`
            - [ ] At text input field, fold smartphone keyboard once Enter key gets hit.
            - [ ] Adjust table size according to viewing devices.
        - `karaoke-by-gender.html`
            - [ ] Clicked singer td becomes purple
            - [ ] Refocus after radio selection and after singer click
            - [ ] Re-selection of radio (gender) should probably hide song table of previous singer
    - Refactoring
        - [ ] Maybe regroup all `fuseOptions` in a single file/place?
        - [ ] naming
            - [ ] HTML class, id naming unification
                - [ ] CSS accordingly
            - [ ] JS variable naming unification
    - Bugs
        - [ ] Table of female singers contains an empty td
- Figure out some Hugo stuffs
    - [ ] Why `Minify` and `Fingerprint`?
      ```hugo
      {{ $script := resources.Get "js/age-verification.js" | resources.Minify | resources.Fingerprint }}
      <script src="{{ $script.Permalink }}"></script>
      ```


## Learning Resources?

- [tailwind](https://tailwindcss.com)
    - <https://shuffle.dev/tailwind/classes/text-color/text-blue-500>


## Features

- Responsive design
- Dark color scheme (can be set per page)
- Private albums
- Justified album views with [Flickr's Justified Layout](https://github.com/flickr/justified-layout)
- Lightbox with [PhotoSwipe](https://photoswipe.com/)
- SEO with Open Graph tags
- Automatic (or manual) selection of feature/cover images

## Installation

This theme requires Hugo Extended >= 0.121.2. Dependencies are bundled, so no Node.js/NPM and PostCSS is needed.

### As a Hugo Module

Requires the Go binary installed.

```sh
hugo mod init github.com/<your_user>/<your_project>
```

Then add the theme to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/nicokaiser/hugo-theme-gallery/v4"
```

### As Git Submodule

```sh
git submodule add --depth=1 https://github.com/nicokaiser/hugo-theme-gallery.git themes/gallery
```

## Usage

Page bundles which contain at least one image are listed as album or gallery:

```plain
content/
├── _index.md
├── about.md             <-- not listed in album list
├── animals/
│   ├── _index.md
│   ├── cats/
│   |   ├── index.md
│   |   ├── cat1.jpg
│   |   └── feature.jpg  <-- album thumbnail
│   ├── dogs/
│   |   ├── index.md
│   |   ├── dog1.jpg     <-- album thumbnail
│   |   └── dog2.jpg
│   └── feature.jpg
├── bridge.jpg           <-- site thumbnail (OpenGraph, etc.)
└── nature/
    ├── index.md         <-- contains `featured_image: images/tree.jpg`
    ├── images/
    |   └── tree.jpg     <-- album thumbnail
    ├── nature1.jpg
    └── nature2.jpg
```

- `/about.md` is not a Page Bundle and does not have image resources. It is not displayed in the album list.
- `/nature` is a Leaf Bundle (has `index.md` and no children) => displayed as gallery (`single` layout).
- `/animals` is a Branch Bundle (has `_index.md` and has children) => displayed as album list (`list` layout).
- The image resource with `*feature*` in its name or the first image found is used as thumbnail image for album lists.
- Albums without an image are not shown.

### Front matter

- `title` -- title of the album, shown in the album list and on the album page.
- `date` -- album date, used for sorting (newest first).
- `description` -- description shown on the album page.
- `featured_image` -- name of the image file used for the album thumbnail. If not set, the first image which contains `feature` in its filename is used, otherwise the first image in the album.
- `weight` -- can be used to adjust sort order.
- `private` -- if set to `true`, this album is not shown in the album overview and is excluded from RSS feeds.
- `featured` -- if set to `true`, this album is featured on the homepage (even if private).
- `sort_by` -- property used for sorting images in an album. Default is `Name` (filename), but can also be `Date`.
- `sort_order` -- sort order. Default is `asc`.
- `params.theme` -- color theme for this page. Defaults to `defaultTheme` from configuration.

### Album Cover / Featured Image

By default, the cover image of an album is the first image in its folder. To select a specific image (which must be part of the album), use the `featured_image` frontmatter:

```plain
---
featured_image: img_1234.jpg
title: Cats
---
```

### Image Metadata

Image titles for the lightbox view are either taken from the `ImageDescription` EXIF tag, or the `title` in the resource metadata.

EXIF tags can be written using software like Adobe Lightroom or by using command line tools like exiftool:

```sh
exiftool -ImageDescription="A closeup of a gray cat's face" cat-4.jpg
```

Alternatively, the image title can be set in the front matter:

```plain
---
date: 2024-02-18T14:12:44+0100
title: Cats
resources:
  - src: cat-1.jpg
    title: Brown tabby cat on white stairs
    params:
      date: 2024-02-18T13:04:30+0100
  - src: cat-4.jpg
    title: A closeup of a gray cat's face
---
```

### Categories

If you use categories in your albums, the homepage displays a list of categories.
Make sure `term` is not included in `disabledKinds` in the site config.

content/dogs/index.md:

```plain
---
date: 2023-01-12
featured_image: dogs-title-image.jpg
title: Dogs
categories: ["animals", "nature"]
---
```

Categories can also have custom titles and descriptions (by default, the "animals" category will have "Animals" as title and no description). Just create a `content/categories/<category>/_index.md`:

content/categories/animals/\_index.md:

```plain
---
title: Cute Animals
description: This is the description text of the "animals" category.
---
```

#### List of Categories

To enable a list of categories, each category must at least have an image in the `content/categores/<category>/` folder. Also, `taxonomy` must _not_ be included in the `disableKinds` in the site config.

Then, `/categories` displays a list of categories, with their featured image.

#### Other Taxonomies

You can also use other taxonomies like `series`.  Note that only `categories` and `tags` are enabled by Hugo's default settings. Using `series` as additional taxonomy is left as an exercise for the reader.

### Featured Content on the Homepage

Albums (and als taxonomy pages like categories) can be marked as "featured":

```plain
---
title: Featured Album
featured: true
---
```

When used in combination with `private: true` this album is only shown as featured album on the homepage, and not in any album list.

Note that also categories or any other taxonomy term can be marked as featured, so you can feature a whole category, series, etc.

By default, the homepage displays

- the site title,
- links to all categories (if categories are enabled and used)
- the most recent featured content (even if private)
- all non-private top-level albums

This can easily be adjusted by using a local version of `layouts/_default/home.html`.

### Related Content

If related content is available for your site (e.g. when keywords or tags are used), related albums are shown below each gallery. Read more about this in the [Hugo Docs](https://gohugo.io/content-management/related/#configure-related-content).

Here is an example section in `config/_default/hugo.toml` to enable related content:

```toml
[related]
  includeNewer = true
  threshold = 10
  toLower = false
  [[related.indices]]
    applyFilter = false
    cardinalityThreshold = 0
    name = 'categories'
    pattern = ''
    toLower = false
    type = 'basic'
    weight = 10
  [[related.indices]]
    applyFilter = false
    cardinalityThreshold = 0
    name = 'keywords'
    pattern = ''
    toLower = false
    type = 'basic'
    weight = 50
```

### Social Icons

Use the `socialIcons` configuration key to add social icons on the bottom of each page:

```toml
[params]
  ...
  [params.socialIcons]
    facebook = "https://www.facebook.com/"
    instagram = "https://www.instagram.com/"
    github = "https://github.com/nicokaiser/hugo-theme-gallery/"
    youtube = "https://www.youtube.com/"
    email = "mailto:user@example.com"
    linkedin = "https://linkedin.com/"
```

### Custom CSS

CSS is generated with Hugo Pipes, so you can add additional CSS in `assets/css/custom.css` (see example in `exampleSite`).

## Author

- [Nico Kaiser](https://kaiser.me/)
