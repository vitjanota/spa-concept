# Single Page App concept

This is a simple frameworkless SPA concept based on compilation of different sources.

Works still in progress.

## Configuration
Example is configured to work with `http://mydomain/test/spa/`. 

### Bun or node.js
Just check `index.ts` present in this example.

### Apache web server
Apache config (`httpd.conf`) should contain corresponding `Directory` setup:

```
Alias /test/spa mydirectory
<Directory "mydirectory">
	AllowOverride All
	Require all granted
</Directory>
```

or similar.

Apache local config file (`.htaccess` present in this example) is a integral part of app setup. So be sure that:

1. usage of `.htaccess` is allowed (`AllowOverride All`) as above.
2. `mod_rewrite` module (used in it) is enabled.

### SPA index path change
If you want to change default index path (`/test/spa/`) following places need to be altered accordingly:

1. base definition in `spa.html` head.
2. `appIndexPath` variable in `js/app/setup.js`.
3.  `app.get` path (line 9) in `index.ts`.
4. `Directory` setup in Apache config.
5. rewrite rule in `.htaccess`.

