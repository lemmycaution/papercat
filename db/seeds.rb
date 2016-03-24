Papercat::User.create(email: 'admin@paper.cat', password: 'passw0rd')
Papercat::Template.create(locale: I18n.locale.to_s, path: 'layouts/papercat/page', handler: 'erb', format: 'html', partial: false, body: File.read(Papercat::Engine.root + 'app/views/layouts/papercat/page.html.erb'))
Papercat::Page.create(title: 'Home Page', pathname: 'home', default: true, body: '<h1>Home Page</h1><p>Thanks for using papercat!</p>')