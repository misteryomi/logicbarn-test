
## Running the Project

Docker is required to get the project running.

Run `composer install` to get the required packages installed.

Navigate to the project directory and nitiate the services by running the `docker compose up -d` or `./vendor/bin/sail up` command.

Next, run `./vendor/bin/sail npm run dev`.

Navigate to `http://localhost` on your browser.

Default db values are:
```
DB_USERNAME=root
DB_PASSWORD=password
```

*This is for tests only, and not recommended for production projects*

NB: 
- A sample import file, `Blog_tests_upload.xlxs` has been added to the project root as a sample blogs document for the import feature.
- Should the localhost port 80 be busy, add `APP_PORT=89` or any other port value to the .env file
- Should the `mysql` service fail to start, add `FORWARD_DB_PORT=33062` or any other port value to the .env file