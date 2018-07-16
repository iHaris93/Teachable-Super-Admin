# Teachable Super Admin ![Github All Releases](https://img.shields.io/github/downloads/Ellf/Teachable-Super-Admin/total.svg) ![license](https://img.shields.io/github/license/ellf/teachable-super-admin.svg) ![Github file size](https://img.shields.io/github/size/ellf/Teachable-Super-Admin/teachable-super-admin.user.js.svg)



Additional features for the Teachable Admin

This is a script file for Tampermonkey, a chrome plugin which allows JavaScript files to be 'injected' into websites.

This is perfectly safe but I am offering this as an open source project so people can see that there is no malicious code in this project.

What this script does is to give the Admin a bit more control over exporting sections.

Right now, only the Code Snippets sections and pages work. This includes:

* CSS
* Header Code
* Logged In
* Logged Out
* Some HTML/Liquid Blocks

The platform is throwing up some interesting conundrums that will need to be ironed out before allowing this to be used outside of our test school.

Currently working on the lectures view along with User Experience and UI design.

# How to Use Super Admin
- [ ] :fire: add full instructions on how to use Tampermonkey.

Make sure to change line 7 to match your own school domain.

```// @match        *://*.purplehippo.io/admin/*```

This means if you don't have a custom domain (are still using Teachable's domain) then, line 7 may look something like:

```// @match        *://*.teachable.com/admin/*```

# Purple Hippo Web Studio
If you're looking for a Teachable developer, feel free to reach out to me at tom@purplehippo.io
