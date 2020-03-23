# Single Page App concept

This is a simple frameworkless SPA concept based on compilation of different sources.

Works still in progress.

## Configuration
Example is configured to work with `http://mydomain/test/spa/` and with Apache Web Server. So Apache config (`httpd.conf`) should contain corresponding `Directory` setup:

```
Alias /test/spa mydirectory
<Directory "mydirectory">
	AllowOverride All
	Require all granted
</Directory>
```

or similar.

Apache local config file (`.htaccess`) is a integral part of app setup. So be sure that:

1. usage of `.htaccess` is allowed (`AllowOverride All`) as above.
2. `mod_rewrite` module (used in it) is enabled.

If you want to change default index path (`/test/spa/`) following places need to be altered accordingly:

1. `Directory` setup in Apache config.
2. rewrite rule in `.htaccess`.
3. base definition in `spa.html` head.
4. `appIndexPath` variable in `js/app/setup.js`.

