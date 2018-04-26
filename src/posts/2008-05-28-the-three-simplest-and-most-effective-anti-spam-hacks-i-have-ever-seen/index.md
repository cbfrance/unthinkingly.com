---
kind: article
created_at: 2008-05-28 22:18:08
title: The Three Simplest and Most Effective Anti-Spam Hacks I Have Ever Seen
excerpt: "The blocklists are just put it right there in that same block in main.cf. I typically use four of them."
tags: [spam, code, ops]
modified_on: 2008-05-28 23:06:43
status: publish 
path: /2008/05/28/the-three-simplest-and-most-effective-anti-spam-hacks-i-have-ever-seen
---

###Hack zero: Switch to Gmail
This is not a joke: Gmail is a fantastic and nearly spam-free platform. Notably, you can hook it up with a custom domain name so no one knows you are part of the Goog machine like everyone else.

###Hack one: Greylisting with Postfix on Ubuntu

<blockquote>A mail transfer agent using greylisting will "temporarily reject" any email from a sender it does not recognize. If the mail is legitimate, the originating server will most likely try again to send it later, at which time the destination will accept it. <span class="attribution"><a href="http://en.wikipedia.org/wiki/Greylisting">Wikipedia: Greylisting</a></span></blockquote>

Assuming that you have your own email server, <a href="http://postgrey.schweikert.ch/">greylisting</a> is genius. <a href="http://en.wikipedia.org/wiki/Greylisting">Diabolically elegant</a>, really. If you run an email server (or any server that can receive email) you are probably running the Postfix MTA, in which case their is a main configuration file appropriately named main.cf. A couple of edits to this file and you are on your way. 

Here's how this setup looks (not my graph but I have definitely seen this happen on production mailservers):

<img src="/static/images/mailgraph_greylisting.jpg" title="spam goes away" alt=" " /> 

The really brilliant thing about greylisting is that it it deals with spam way before it ever reaches your inbox, which is the only way to go (I don't use any spam filtering on my mailbox. That's too late, especially from a sysadmin perspective (think of the <strike>children</strike> cycles!).

Step one: install postgrey.


```
apt-get install postgrey
```


Two: edit your main.cf file. 


```
sudo vi /etc/postfix/main.cf
```


Three: Then open it up and look for your smtpd_restrictions; add the following line:


```
check_policy_service inet:127.0.0.1:60000 
```


Four: Reload Postfix


```
/etc/init.d/postfix reload
```


###Hack 2: DNS Blocklists

This one is even easier, requiring only an extra line (for each blocklist). The blocklists are Just put it right there in that same block in main.cf. I typically use four of them. (Each has a slightly different purpose and tolerance. Check out the sites to get a flavor for why they exist.) This one is actually my favorite &mdash; it was created by the geek premier <a href="http://en.wikipedia.org/wiki/Paul_Vixie">Paul Vixie</a> and uses a <a href="http://en.wikipedia.org/wiki/DNSBL">DNS lookup</a> for an extraordinarily light overhead. 

Step One: 

Open your main.cf file again and add these lines:

```
  reject_rbl_client list.dsbl.org,
  reject_rbl_client sbl.spamhaus.org,
  reject_rbl_client cbl.abuseat.org,
  reject_rbl_client dul.dnsbl.sorbs.net
```

Then reboot Postfix: 

```bash
  /etc/init.d/postfix reload
```

As with the example above you will also want to watch your mail log to make sure nothings gone wrong. 

```bash
  sudo tail -f /var/log/maillog
```

### Hack 3: Keep Spammers out of Your Forms

This is really the ideal place to stop spam: before it happens. There are a bazillion ways to prove that someone is a human (CAPTCHAs ... sigh), but I think it is instead better to put the burden on the bots. 

Step one: 
Add a hidden field to your form. 

```html
  <textarea name="comment" class="hidden">
```

 Step two: 

In your handler, ignore anybody that filled out that form (as robots will do). Here's a fragment in php (assumes that the presence of a errors array will prevent submissions):

```php
  if (!empty($_REQUEST['comment'])) { $errors[] = "No Spam please."; }
```

Those are my favorites, let me know if you have any others!