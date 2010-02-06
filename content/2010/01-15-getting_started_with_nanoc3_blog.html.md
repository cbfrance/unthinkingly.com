---
title: Getting Started With nanoc3_blog 
kind: article
tags: [nanoc3]
created_at: 2010/01/15
excerpt: How to create a blog using nanoc3_blog starter kit.
---

## Installation

From the command line

    % gem install rack rake mime-types nanoc3 haml kramdown
    % git clone git://github.com/mgutz/nanoc3_blog.git your_blog

## Configuration

Edit the configuration files:

    config.yaml
    content/atom.xml.erb

## Previewing the Site

Compile the site

    # clean output directories
    % rake clean 

    # compile the site
    % nanoc3 compile

    # autocompile the site. any edit to a file is previewable automatically.
    % nanoc3 aco

Preview the site

    http://localhost:3000

## Adding Content

Copy any of the files in `content/2010` and edit.  Use a date later than `01-18` and it will appear as the first post in your blog.

## Customizing Existing Content

Edit these two files:

    content/about.haml
    content/sticky.haml # Your whitespace are belong to us box.

To change the front page: `content/index.haml`

To change the site layout: `layouts/default.haml`

To style the site:  `content/assets/style.sass`