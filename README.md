npm-script
==========

Manage package.json `npm run` scripts without package.json editing

```
$ npm install -g npm-script
$ npm-script set example "echo This is an example"
set: example
$ npm-script ls
example: echo This is an example
$ npm-script get example
echo This is an example
$ npm run example

> npm-script@1.0.0 example /Users/rebecca/code/npm-script
> echo This is an example

This is an example
$ npm-script set example ""
cleared: example
```

What this does
==============

This just reads and edits your package.json, which makes it easier to make
changes from scripts or as documentation.
