namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'foreman start -f Procfile.dev -p 3000'
  end

  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start -f Procfile -p 3000'
  end
end
task :start => 'start:development'
