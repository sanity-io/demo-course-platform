# Demo Course Platform

An example Studio and Next.js Front End handling multiple strategies for Localization with Sanity.io

(The `studio-v3` folder is a work in progress as `v3` is [currently in Developer Preview](https://beta.sanity.io/))

Read guides about Localization with Sanity.io on the Demo Site: [demo-course-platform.sanity.build](https://demo-course-platform.sanity.build/)

## Video Walkthrough

➡️ [Watch a 6 minute walkthrough on Loom](https://www.loom.com/share/38426f7e33ce45bcab9c19eaeec10809)

![Course Platform Studio](./img/course-platform-studio.png)
![Course Platform Website](./img/course-platform-website.png)

## Schema

Each schema demonstrates a unique strategy:

### Lessons

Document-level internationalization using the [@sanity/document-internationalization](https://www.npmjs.com/package/@sanity/document-internationalization) plugin. The documents in this schema are all text and use Portable Text so it is best to translate the entire document – not just fields within them.

### Courses

Field-level internationalization using the [@sanity/language-filter](https://www.npmjs.com/package/@sanity/language-filter) plugin. Only some fields in this schema require localization so we have a mix of localized objects (`title` and `slug`) as well as global fields.

### Presenters

Also uses Field-level internationalization using the new [sanity-plugin-internationalized-array](https://www.npmjs.com/package/sanity-plugin-internationalized-array) plugin. Again only some fields are localized and some are global. This plugin may be more beneficial if you have more than four languages to save on the number of unique attributes in a dataset.

### Label Group

A singleton document with an array of key-value pairs. Useful for globally translated content for example buttons and labels. This uses the [Google Translate](https://www.sanity.io/plugins/sanity-plugin-google-translate) plugin which can automatically translate from the base language field directly in the Studio.

### Legal

A demonstration of writing multiple languages or market-specific content within a single document and filtering the content at the time of query. Allows authors to create personalised content to markets without handling multiple fields or documents.
