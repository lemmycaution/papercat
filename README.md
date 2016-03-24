# Papercat

Tiny CMS as a Rails engine. 

## Example app

create main rails app 

`rails new paperly --database=postgresql`

add below lines into Gemfile

```
gem 'carrierwave', github: 'carrierwaveuploader/carrierwave'
gem 'papercat', github: 'lemmycaution/papercat
```

mount papercat engine by adding below into config/routes.rb

`mount Papercat::Engine => "/"`

run  `bundle install`

setup db

```
rake papercat:install:migrations 
rake db:create
rake db:migrate
```

add `Papercat::Engine.load_seed` to db/seeds.rb then run `rake db:seed`

run up rails app `rails s` and open `http://localhost:3000/admin` to rock with papercat!

## Deployment

You need to provide AWS creds to make papercat work smoothly when it's deployed to production. ENV var needs to be set are;

```
AWS_ACCESS_KEY_ID=YOUR_AWS_KEY_ID
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
AWS_REGION=YOUR_AWS_BUCKET_REGION
AWS_BUCKET=YOUR_AWS_BUCKET_NAME
```